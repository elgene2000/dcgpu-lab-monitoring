import os
import json
import redis
import asyncio
import subprocess
import re
from datetime import datetime
from celery import shared_task
from utils.models.pdu import PDU
from utils.models.power import Power
from utils.models.temperature import Temperature
from utils.models.systems import Systems
from puresnmp import Client, V2C, ObjectIdentifier as OID
from dotenv import load_dotenv

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


def fetch_system_temperature_via_ipmi(bmc_ip: str, username: str, password: str):
    """
    Fetch system temperature using ipmitool with three different sensor patterns.
    Returns temperature value if successful, None if all commands fail.
    """
    commands = [
        f'ipmitool -I lanplus -H {bmc_ip} -U {username} -P {password} sensor | grep "UBB Board Temp"',
        f'ipmitool -I lanplus -H {bmc_ip} -U {username} -P {password} sensor | grep UBB_TEMP_FRONT',
        f'ipmitool -I lanplus -H {bmc_ip} -U {username} -P {password} sensor | grep TEMP_MI300_BACK'
    ]
    
    for i, command in enumerate(commands):
        try:
            sensor_name = ["UBB Board Temp", "UBB_TEMP_FRONT", "TEMP_MI300_BACK"][i]
            print(f"Trying command {i+1} for {bmc_ip} ({sensor_name}): {command.split('|')[0]}...")
            
            # Execute the command
            result = subprocess.run(
                command,
                shell=True,
                capture_output=True,
                text=True,
                timeout=30  # 30 second timeout
            )
            
            if result.returncode == 0 and result.stdout.strip():
                # Parse the output to extract temperature
                output = result.stdout.strip()
                print(f"IPMI output for {bmc_ip} ({sensor_name}): {output}")
                
                # Extract temperature value using multiple regex patterns
                temp_patterns = [
                    # Pattern 1: Standard format like "25.000 | degrees C"
                    r'(\d+\.?\d*)\s*\|\s*degrees\s*C',
                    # Pattern 2: Direct format like "25.000 degrees C"
                    r'(\d+\.?\d*)\s*degrees\s*C',
                    # Pattern 3: More flexible format
                    r'(\d+\.?\d*)\s*[|\s]*degrees\s*C'
                ]
                
                temperature = None
                for pattern in temp_patterns:
                    match = re.search(pattern, output, re.IGNORECASE)
                    if match:
                        temperature = float(match.group(1))
                        print(f"Successfully extracted temperature {temperature}°C from {bmc_ip} using sensor {sensor_name}")
                        return temperature
                
                if temperature is None:
                    print(f"Could not parse temperature from output: {output}")
                    # Try to extract any number followed by degrees
                    fallback_match = re.search(r'(\d+\.?\d*)', output)
                    if fallback_match:
                        temperature = float(fallback_match.group(1))
                        print(f"Fallback: extracted temperature {temperature}°C from {bmc_ip} using sensor {sensor_name}")
                        return temperature
                    
            else:
                print(f"Command {i+1} failed for {bmc_ip}. Return code: {result.returncode}")
                if result.stderr:
                    print(f"Error: {result.stderr}")
                    
        except subprocess.TimeoutExpired:
            print(f"Command {i+1} timed out for {bmc_ip}")
        except Exception as e:
            print(f"Exception in command {i+1} for {bmc_ip}: {e}")
            
    print(f"All 3 IPMI commands failed for {bmc_ip}")
    return None


def parse_ipmi_credentials():
    """
    Parse IPMI credentials from environment variable or file.
    Tries multiple file paths to handle different environments.
    """
    import ast
    import json
    
    # Try different file paths in order of preference
    possible_paths = [
        os.environ.get("IPMI_CREDENTIALS_FILE"),  # Environment variable path
        "/app/ipmi_credentials.json",             # Docker container path
        "./ipmi_credentials.json",                # Local relative path
        "ipmi_credentials.json",                  # Current directory
        os.path.join(os.path.dirname(__file__), 'ipmi_credentials.json'),  # Same dir as script
    ]
    
    # Remove None values and duplicates while preserving order
    paths_to_try = []
    for path in possible_paths:
        if path and path not in paths_to_try:
            paths_to_try.append(path)
    
    print("=== IPMI CREDENTIALS LOADING DEBUG ===")
    print(f"Will try these paths in order: {paths_to_try}")
    
    # Try environment variables first (same as before)
    ipmi_credentials_str = os.environ.get("IPMI_CREDENTIALS")
    ipmi_credentials_json = os.environ.get("IPMI_CREDENTIALS_JSON")
    
    credential_list = None
    
    # Try JSON format from environment
    if ipmi_credentials_json:
        try:
            print("Parsing credentials from JSON environment variable")
            credential_list = json.loads(ipmi_credentials_json)
            print("Successfully parsed JSON credentials from environment")
        except Exception as e:
            print(f"Error parsing JSON credentials from environment: {e}")
    
    # Try Python literal format from environment
    if not credential_list and ipmi_credentials_str:
        try:
            print("Parsing credentials from Python literal environment variable")
            cleaned_str = ipmi_credentials_str.strip().replace('\n', '').replace('\r', '')
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
        print("ERROR: No IPMI credentials found in any location!")
        print("Expected format: [['system','bmc_ip','username','password'], ...]")
        print("Tried environment variables: IPMI_CREDENTIALS, IPMI_CREDENTIALS_JSON, IPMI_CREDENTIALS_FILE")
        print(f"Tried file paths: {paths_to_try}")
        return {}
    
    # Rest of the function remains the same...
    credentials_dict = {}
    try:
        if not isinstance(credential_list, list):
            print("IPMI credentials must be a list format")
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
    Fetch system temperature data using IPMI commands for systems in the database.
    Matches system names from database with IPMI credentials and collects temperature data.
    """
    try:
        # Parse IPMI credentials from environment
        ipmi_credentials = parse_ipmi_credentials()
        
        if not ipmi_credentials:
            print("No valid IPMI credentials found")
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
                
            # Check if we have IPMI credentials for this system
            if system_name not in ipmi_credentials:
                print(f"No IPMI credentials found for system: {system_name}")
                continue
                
            matched_systems += 1
            credentials = ipmi_credentials[system_name]
            bmc_ip = credentials["bmc_ip"]
            username = credentials["username"]
            password = credentials["password"]
            
            print(f"Processing system temperature for: {system_name} (BMC: {bmc_ip})")

            # Fetch temperature using IPMI
            temperature_reading = fetch_system_temperature_via_ipmi(
                bmc_ip, username, password
            )

            if temperature_reading is not None:
                temp_data = {
                    "system": system_name,
                    "bmc_ip": bmc_ip,
                    "reading": temperature_reading,
                    "symbol": "°C",
                    "created": created_time,
                    "updated": created_time,
                }
                system_temperature_list.append(temp_data)
                print(f"Successfully collected temperature {temperature_reading}°C for {system_name}")
                print(f"Temperature data prepared: {temp_data}")
            else:
                print(f"Failed to collect temperature for {system_name} (BMC: {bmc_ip})")

        print(f"Processed {matched_systems} systems with IPMI credentials out of {len(all_systems)} total systems")

        # Upload to DB with detailed logging
        if system_temperature_list:
            print(f"Attempting to save {len(system_temperature_list)} temperature records to database...")
            
            try:
                # Initialize the SystemTemperature model
                system_temp = SystemTemperature()
                print("SystemTemperature model initialized successfully")
                
                successful_inserts = 0
                failed_inserts = 0
                
                for i, temp_data in enumerate(system_temperature_list):
                    try:
                        print(f"Inserting record {i+1}/{len(system_temperature_list)}: {temp_data['system']} - {temp_data['reading']}°C")
                        result = system_temp.create(temp_data)
                        print(f"Database insert result: {result}")
                        successful_inserts += 1
                    except Exception as e:
                        print(f"Failed to insert record {i+1} ({temp_data['system']}): {e}")
                        print(f"Failed record data: {temp_data}")
                        failed_inserts += 1

                print(f"Database insertion complete: {successful_inserts} successful, {failed_inserts} failed")
                
                if successful_inserts > 0:
                    print(f"System temperature data successfully stored in DB ({successful_inserts} records)")
                else:
                    print("No records were successfully inserted into the database")
                    
            except Exception as e:
                print(f"Error initializing SystemTemperature model or database connection: {e}")
                print(f"Error type: {type(e)}")
                import traceback
                traceback.print_exc()
                
        else:
            print("No system temperature data collected to save")
            
    except Exception as e:
        print(f"Error in fetch_system_temperature_data: {e}")
        import traceback
        traceback.print_exc()
        return