import os
import json
import redis
import asyncio
import subprocess
import re
import requests
from datetime import datetime
from celery import shared_task
from utils.models.pdu import PDU
from utils.models.power import Power
from utils.models.temperature import Temperature
from utils.models.systems import Systems
from puresnmp import Client, V2C, ObjectIdentifier as OID
from dotenv import load_dotenv
import urllib3

# Disable SSL warnings for self-signed certificates
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Import SystemTemperature model with error handling
try:
    from utils.models.system_temperature import SystemTemperature
    print("SystemTemperature model imported successfully")
except ImportError as e:
    print(f"Failed to import SystemTemperature model: {e}")
    SystemTemperature = None

# Ensure .env file is loaded in tasks
load_dotenv()

@shared_task
def say_hello():
    print("Hello from Celery!")

async def snmpFetch(pdu_hostname: str, oid: str, v2c: str, type: str):
    try:
        client = Client(pdu_hostname, V2C(v2c))

        # Retrieve SNMP value
        data = await client.get(OID(oid))

        if not data:
            return None

        if type == "temp":
            return float(data.value / 10)
        else:
            return int(data.value)
    except Exception as e:
        print(e)
        return None


def determine_system_type(system_name: str):
    """
    Determine system type based on system name prefix.
    Returns: 'smci', 'miramar', 'gbt', 'quanta', or 'unknown'
    """
    system_name_lower = system_name.lower()
    
    if system_name_lower.startswith('smci'):
        return 'smci'
    elif system_name_lower.startswith('miramar'):
        return 'miramar'
    elif system_name_lower.startswith('gbt'):
        return 'gbt'
    elif system_name_lower.startswith('quanta'):
        return 'quanta'
    else:
        return 'unknown'


def fetch_gpu_temperatures_redfish(bmc_ip: str, username: str, password: str, system_type: str):
    """
    Fetch GPU temperatures for all 8 GPUs using Redfish API with retry logic.
    Returns a list of 8 temperatures (indexed 0-7) or None if failed.
    """
    
    def attempt_fetch():
        """Single attempt to fetch GPU temperatures"""
        try:
            if system_type == 'smci':
                # SMCI: GPUs numbered 1-8
                url = f"https://{bmc_ip}/redfish/v1/Chassis/1/Thermal"
                
                response = requests.get(
                    url, 
                    auth=(username, password), 
                    verify=False, 
                    timeout=30
                )
                
                if response.status_code != 200:
                    print(f"SMCI request failed for {bmc_ip}: HTTP {response.status_code}")
                    return None
                
                try:
                    thermal_data = response.json()
                    gpu_temps = [None] * 8  # Initialize with None for 8 GPUs
                    
                    # Look for UBB GPU Temp in temperatures array
                    for temp_sensor in thermal_data.get('Temperatures', []):
                        if temp_sensor.get('Name') == 'UBB GPU Temp':
                            oem_details = temp_sensor.get('Oem', {}).get('Supermicro', {}).get('Details', {})
                            
                            # Extract GPU temperatures 1-8 and map to 0-7 index
                            for gpu_num in range(1, 9):
                                gpu_key = f'UBB GPU {gpu_num} Temp'
                                if gpu_key in oem_details:
                                    gpu_temps[gpu_num - 1] = float(oem_details[gpu_key])
                            break
                    
                    return gpu_temps
            else:
                print(f"Unknown system type: {system_type}")
                return None
                    
                except json.JSONDecodeError as e:
                    print(f"SMCI JSON decode error for {bmc_ip}: {e}")
                    return None
                    
            elif system_type == 'miramar':
                # Miramar: GPUs numbered 0-7
                url = f"https://{bmc_ip}/redfish/v1/Chassis/Miramar_Sensor/Thermal"
                
                response = requests.get(
                    url, 
                    auth=(username, password), 
                    verify=False, 
                    timeout=30
                )
                
                if response.status_code != 200:
                    print(f"Miramar request failed for {bmc_ip}: HTTP {response.status_code}")
                    return None
                
                try:
                    thermal_data = response.json()
                    gpu_temps = [None] * 8  # Initialize with None for 8 GPUs
                    
                    # Look for TEMP_MI300_GPU{0-7} sensors
                    for temp_sensor in thermal_data.get('Temperatures', []):
                        member_id = temp_sensor.get('MemberId', '')
                        if member_id.startswith('TEMP_MI300_GPU'):
                            try:
                                gpu_num = int(member_id.replace('TEMP_MI300_GPU', ''))
                                if 0 <= gpu_num <= 7:
                                    reading = temp_sensor.get('ReadingCelsius')
                                    if reading is not None:
                                        gpu_temps[gpu_num] = float(reading)
                            except ValueError:
                                continue
                    
                    return gpu_temps
                    
                except json.JSONDecodeError as e:
                    print(f"Miramar JSON decode error for {bmc_ip}: {e}")
                    return None
                    
            elif system_type == 'gbt':
                # Gigabyte: GPUs numbered 0-7
                url = f"https://{bmc_ip}/redfish/v1/Chassis/1/Thermal"
                
                response = requests.get(
                    url, 
                    auth=(username, password), 
                    verify=False, 
                    timeout=30
                )
                
                if response.status_code != 200:
                    print(f"Gigabyte request failed for {bmc_ip}: HTTP {response.status_code}")
                    return None
                
                try:
                    thermal_data = response.json()
                    gpu_temps = [None] * 8  # Initialize with None for 8 GPUs
                    
                    # Look for GPU_{0-7}_DIE_TEMP sensors
                    for temp_sensor in thermal_data.get('Temperatures', []):
                        name = temp_sensor.get('Name', '')
                        if name.startswith('GPU_') and name.endswith('_DIE_TEMP'):
                            try:
                                # Extract GPU number from "GPU_{N}_DIE_TEMP"
                                gpu_num = int(name.split('_')[1])
                                if 0 <= gpu_num <= 7:
                                    reading = temp_sensor.get('ReadingCelsius')
                                    if reading is not None:
                                        gpu_temps[gpu_num] = float(reading)
                            except (ValueError, IndexError):
                                continue
                    
                    return gpu_temps
                    
                except json.JSONDecodeError as e:
                    print(f"Gigabyte JSON decode error for {bmc_ip}: {e}")
                    return None
            elif system_type == 'quanta':
                # Quanta: GPUs numbered 0-7, each GPU has its own chassis
                # Requires 8 separate API calls to get individual GPU temperatures
                gpu_temps = [None] * 8  # Initialize with None for 8 GPUs
                
                for gpu_num in range(8):
                    try:
                        url = f"https://{bmc_ip}/redfish/v1/Chassis/GPU_{gpu_num}/Sensors/GPU_{gpu_num}_Temp_0"
                        
                        response = requests.get(
                            url, 
                            auth=(username, password), 
                            verify=False, 
                            timeout=10  # Shorter timeout for individual GPU requests
                        )
                        
                        if response.status_code == 200:
                            sensor_data = response.json()
                            reading = sensor_data.get('Reading')
                            if reading is not None:
                                gpu_temps[gpu_num] = float(reading)
                        else:
                            print(f"Quanta GPU_{gpu_num} request failed for {bmc_ip}: HTTP {response.status_code}")
                            
                    except requests.exceptions.Timeout:
                        print(f"Quanta GPU_{gpu_num} request timed out for {bmc_ip}")
                        continue
                    except requests.exceptions.RequestException as e:
                        print(f"Quanta GPU_{gpu_num} request exception for {bmc_ip}: {e}")
                        continue
                    except (json.JSONDecodeError, ValueError) as e:
                        print(f"Quanta GPU_{gpu_num} JSON/conversion error for {bmc_ip}: {e}")
                        continue
                
                return gpu_temps
                
        except requests.exceptions.Timeout:
            print(f"Redfish request timed out for {bmc_ip}")
            return None
        except requests.exceptions.RequestException as e:
            print(f"Request exception for {bmc_ip}: {e}")
            return None
        except Exception as e:
            print(f"Exception during Redfish fetch for {bmc_ip}: {e}")
            return None
    
    # First attempt
    print(f"Attempting GPU temperature fetch for {bmc_ip} (type: {system_type})")
    gpu_temperatures = attempt_fetch()
    
    if gpu_temperatures is not None:
        valid_temps = [t for t in gpu_temperatures if t is not None]
        print(f"First attempt successful for {bmc_ip}: {len(valid_temps)}/8 GPUs reported")
        return gpu_temperatures
    
    # Retry once if first attempt failed
    print(f"First attempt failed for {bmc_ip}, retrying...")
    gpu_temperatures = attempt_fetch()
    
    if gpu_temperatures is not None:
        valid_temps = [t for t in gpu_temperatures if t is not None]
        print(f"Retry successful for {bmc_ip}: {len(valid_temps)}/8 GPUs reported")
        return gpu_temperatures
    else:
        print(f"Both attempts failed for {bmc_ip}")
        return None


def parse_bmc_credentials():
    """
    Parse BMC credentials from environment variable or file.
    Tries multiple file paths to handle different environments.
    """
    import ast
    import json
    
    # Try different file paths in order of preference
    possible_paths = [
        os.environ.get("BMC_CREDENTIALS_FILE"),  # Environment variable path
        "/app/bmc_credentials.json",             # Docker container path
        "./bmc_credentials.json",                # Local relative path
        "bmc_credentials.json",                  # Current directory
        os.path.join(os.path.dirname(__file__), 'bmc_credentials.json'),  # Same dir as script
    ]
    
    # Remove None values and duplicates while preserving order
    paths_to_try = []
    for path in possible_paths:
        if path and path not in paths_to_try:
            paths_to_try.append(path)
    
    print("=== BMC CREDENTIALS LOADING DEBUG ===")
    print(f"Will try these paths in order: {paths_to_try}")
    
    # Try environment variables first
    bmc_credentials_str = os.environ.get("BMC_CREDENTIALS")
    bmc_credentials_json = os.environ.get("BMC_CREDENTIALS_JSON")
    
    credential_list = None
    
    # Try JSON format from environment
    if bmc_credentials_json:
        try:
            print("Parsing credentials from JSON environment variable")
            credential_list = json.loads(bmc_credentials_json)
            print("Successfully parsed JSON credentials from environment")
        except Exception as e:
            print(f"Error parsing JSON credentials from environment: {e}")
    
    # Try Python literal format from environment
    if not credential_list and bmc_credentials_str:
        try:
            print("Parsing credentials from Python literal environment variable")
            cleaned_str = bmc_credentials_str.strip().replace('\n', '').replace('\r', '')
            credential_list = ast.literal_eval(cleaned_str)
            print("Successfully parsed Python literal credentials from environment")
        except Exception as e:
            print(f"Error parsing Python literal credentials from environment: {e}")
    
    # Try loading from files if environment variables didn't work
    if not credential_list:
        for file_path in paths_to_try:
            try:
                print(f"Trying to load credentials from: {file_path}")
                
                if not os.path.exists(file_path):
                    print(f"File does not exist: {file_path}")
                    continue
                
                with open(file_path, 'r') as f:
                    content = f.read()
                    print(f"File found, content length: {len(content)} characters")
                    credential_list = json.loads(content)
                    print(f"Successfully loaded {len(credential_list)} credential sets from: {file_path}")
                    break  # Stop trying other paths once we find a working file
                    
            except FileNotFoundError:
                print(f"File not found: {file_path}")
                continue
            except json.JSONDecodeError as e:
                print(f"JSON decode error in {file_path}: {e}")
                continue
            except Exception as e:
                print(f"Error loading credentials from {file_path}: {e}")
                continue
    
    if not credential_list:
        print("ERROR: No BMC credentials found in any location!")
        print("Expected format: [['system','bmc_ip','username','password'], ...]")
        print("Tried environment variables: BMC_CREDENTIALS, BMC_CREDENTIALS_JSON, BMC_CREDENTIALS_FILE")
        print(f"Tried file paths: {paths_to_try}")
        return {}
    
    credentials_dict = {}
    try:
        if not isinstance(credential_list, list):
            print("BMC credentials must be a list format")
            return {}
        
        for i, credential_set in enumerate(credential_list):
            if not isinstance(credential_set, list):
                print(f"Credential set {i+1} must be a list, got: {type(credential_set)}")
                continue
                
            if len(credential_set) != 4:
                print(f"Credential set {i+1} must have exactly 4 elements: [system, bmc_ip, username, password], got: {credential_set}")
                continue
            
            system_name = str(credential_set[0]).strip()
            bmc_ip = str(credential_set[1]).strip()
            username = str(credential_set[2]).strip()
            password = str(credential_set[3]).strip()
            
            if not (system_name and bmc_ip and username and password):
                print(f"Empty values in credential set {i+1}: {credential_set}")
                continue
            
            credentials_dict[system_name] = {
                "bmc_ip": bmc_ip,
                "username": username,
                "password": password
            }
            print(f"Loaded credentials for system: {system_name} (BMC: {bmc_ip})")
                
    except Exception as e:
        print(f"Unexpected error processing credentials: {e}")
        return {}
    
    print(f"Successfully loaded credentials for {len(credentials_dict)} systems")
    return credentials_dict

@shared_task
def fetch_power_data():
    try:
        r = redis.Redis(
            host=os.environ.get("REDIS_HOST"),
            port=os.environ.get("REDIS_PORT"),
            password=os.environ.get("REDIS_PASSWORD"),
            db=0,
        )
        all_pdu = r.get("all_pdu")

        if not all_pdu:
            pdu = PDU()
            all_pdu = pdu.find({})
            # serialize the datetime
            for pdu in all_pdu:
                if "created" in pdu:
                    pdu["created"] = pdu["created"].isoformat()
                if "updated" in pdu:
                    pdu["updated"] = pdu["updated"].isoformat()

            # store in Redis with 3 days TTL
            r.setex("all_pdu", 259200, json.dumps(all_pdu))
        else:
            all_pdu = json.loads(all_pdu)

        power_list = []
        created_time = datetime.now()

        for pdu in all_pdu:
            hostname = pdu["hostname"]
            site = pdu["site"]
            location = pdu["location"]
            output_power_total_oid = pdu["output_power_total_oid"]
            system = pdu.get("system")

            total_power = asyncio.run(
                snmpFetch(hostname, output_power_total_oid, "amd123", "power")
            )
            total_power = total_power or 0  # default to 0 if None

            power_list.append(
                {
                    "site": site,
                    "location": location,
                    "pdu_hostname": hostname,
                    "reading": total_power,
                    "symbol": "W",
                    **({"system": system} if system else {})
                }
            )

        # upload to DB
        power = Power()
        for power_data in power_list:
            power.create(
                {
                    **power_data,
                    "created": created_time,
                    "updated": created_time,
                }
            )

        print("Power data fetched and stored successfully into DB")
    except Exception as e:
        print(f"Error fetching power data: {e}")
        return


@shared_task
def fetch_temperature_data():
    try:
        redis_host = str(os.environ.get("REDIS_HOST") or "localhost")
        redis_port = int(os.environ.get("REDIS_PORT") or 6379)
        redis_password = str(os.environ.get("REDIS_PASSWORD") or "")
        r = redis.Redis(
            host=redis_host,
            port=redis_port,
            password=redis_password if redis_password else None,
            db=0,
        )
        temperature_pdu = r.get("temperature_pdu")

        if not temperature_pdu:
            pdu = PDU()
            temperature_pdu = pdu.find({"temperature": {"$exists": True}})
            # serialize the datetime
            for pdu_item in temperature_pdu:
                if "created" in pdu_item:
                    pdu_item["created"] = pdu_item["created"].isoformat()
                if "updated" in pdu_item:
                    pdu_item["updated"] = pdu_item["updated"].isoformat()

            # store in Redis with 3 days TTL
            r.setex("temperature_pdu", 259200, json.dumps(temperature_pdu))
        else:
            # Only decode if it's bytes or str, not Awaitable
            if isinstance(temperature_pdu, bytes):
                temperature_pdu = json.loads(temperature_pdu.decode("utf-8"))
            elif isinstance(temperature_pdu, str):
                temperature_pdu = json.loads(temperature_pdu)
            else:
                raise TypeError("Unexpected type for temperature_pdu from Redis")

        temperature_list = []
        created_time = datetime.now()

        for pdu in temperature_pdu:
            hostname = pdu["hostname"]
            site = pdu["site"]
            location = pdu["location"]
            temperature_oid = pdu["temperature"]["oid"]
            position = pdu["temperature"]["position"]

            print(f"Processing: {hostname} ({location}-{position})")  # Debug print

            curr_temperature = asyncio.run(
                snmpFetch(hostname, temperature_oid, "amd123", "temp")
            )

            print(f"SNMP result for {hostname} ({location}-{position}): {curr_temperature}")  # Debug print

            curr_temperature = curr_temperature or None

            (
                temperature_list.append(
                    {
                        "site": site,
                        "location": "-".join([location, position]),
                        "pdu_hostname": hostname,
                        "reading": curr_temperature,
                        "symbol": "°C",
                    }
                )
                if curr_temperature is not None
                else None
            )

        # upload to DB
        temperature = Temperature()
        for temperature_data in temperature_list:
            temperature.create(
                {
                    **temperature_data,
                    "created": created_time,
                    "updated": created_time,
                }
            )

        print("Temperature data fetched and stored successfully into DB")
    except Exception as e:
        print(f"Error fetching temperature data: {e}")
        return


@shared_task
def fetch_system_temperature_data():
    """
    Fetch system GPU temperature data using Redfish API for all 8 GPUs per system.
    Matches system names from database with BMC credentials and collects GPU temperature data.
    """
    try:
        # Parse BMC credentials from environment
        bmc_credentials = parse_bmc_credentials()
        
        if not bmc_credentials:
            print("No valid BMC credentials found")
            return
        
        # Check if SystemTemperature model is available
        if SystemTemperature is None:
            print("ERROR: SystemTemperature model is not available. Check if the model file exists and is properly imported.")
            return
            
        # Get systems from database
        print("Fetching systems from database...")
        try:
            systems_model = Systems()
            all_systems = systems_model.find({})
            print(f"Found {len(all_systems)} systems in database")
        except Exception as e:
            print(f"Error fetching systems from database: {e}")
            return
            
        if not all_systems:
            print("No systems found in database")
            return

        system_temperature_list = []
        created_time = datetime.now()
        matched_systems = 0
        
        # Process each system from database
        for system in all_systems:
            system_name = system.get("system")
            if not system_name:
                print(f"System record missing system field: {system}")
                continue
                
            # Check if we have BMC credentials for this system
            if system_name not in bmc_credentials:
                print(f"No BMC credentials found for system: {system_name}")
                continue
                
            matched_systems += 1
            credentials = bmc_credentials[system_name]
            bmc_ip = credentials["bmc_ip"]
            username = credentials["username"]
            password = credentials["password"]
            
            # Determine system type
            system_type = determine_system_type(system_name)
            print(f"Processing system: {system_name} (BMC: {bmc_ip}, Type: {system_type})")

            # Fetch GPU temperatures using Redfish
            gpu_temperatures = fetch_gpu_temperatures_redfish(
                bmc_ip, username, password, system_type
            )

            if gpu_temperatures is not None:
                # Create temperature record with GPU array
                temp_data = {
                    "system": system_name,
                    "bmc_ip": bmc_ip,
                    "gpu_temperatures": gpu_temperatures,  # List of 8 temps (some may be None)
                    "symbol": "°C",
                    "created": created_time,
                    "updated": created_time,
                }
                system_temperature_list.append(temp_data)
                
                valid_temps = [t for t in gpu_temperatures if t is not None]
                print(f"Successfully collected temperatures for {system_name}: {len(valid_temps)}/8 GPUs")
                print(f"GPU temps: {gpu_temperatures}")
            else:
                print(f"Failed to collect GPU temperatures for {system_name} (BMC: {bmc_ip})")
                # Log the failure reason (either credentials issue or no data returned)
                print(f"FAILURE LOG: {system_name} - Could not retrieve data via Redfish API")

        print(f"Processed {matched_systems} systems with BMC credentials out of {len(all_systems)} total systems")

        # Upload to DB with detailed logging
        if system_temperature_list:
            print(f"Attempting to save {len(system_temperature_list)} GPU temperature records to database...")
            
            try:
                # Initialize the SystemTemperature model
                system_temp = SystemTemperature()
                print("SystemTemperature model initialized successfully")
                
                successful_inserts = 0
                failed_inserts = 0
                
                for i, temp_data in enumerate(system_temperature_list):
                    try:
                        valid_gpus = len([t for t in temp_data['gpu_temperatures'] if t is not None])
                        print(f"Inserting record {i+1}/{len(system_temperature_list)}: {temp_data['system']} - {valid_gpus}/8 GPUs")
                        result = system_temp.create(temp_data)
                        print(f"Database insert result: {result}")
                        successful_inserts += 1
                    except Exception as e:
                        print(f"Failed to insert record {i+1} ({temp_data['system']}): {e}")
                        print(f"Failed record data: {temp_data}")
                        failed_inserts += 1

                print(f"Database insertion complete: {successful_inserts} successful, {failed_inserts} failed")
                
                if successful_inserts > 0:
                    print(f"System GPU temperature data successfully stored in DB ({successful_inserts} records)")
                else:
                    print("No records were successfully inserted into the database")
                    
            except Exception as e:
                print(f"Error initializing SystemTemperature model or database connection: {e}")
                print(f"Error type: {type(e)}")
                import traceback
                traceback.print_exc()
                
        else:
            print("No system GPU temperature data collected to save")
            
    except Exception as e:
        print(f"Error in fetch_system_temperature_data: {e}")
        import traceback
        traceback.print_exc()
        return