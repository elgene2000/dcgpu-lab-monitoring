import os
import json
import redis
import asyncio
from datetime import datetime
from celery import shared_task
from utils.models.pdu import PDU
from utils.models.power import Power
from utils.models.temperature import Temperature
from puresnmp import Client, V2C, ObjectIdentifier as OID

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
        print(f"Error fetching power data: {e}")
        return
