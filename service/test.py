
# import os
# import re
import time
import logging
import asyncio

# import smtplib
from datetime import datetime
from dotenv import load_dotenv
from puresnmp import Client, V2C, ObjectIdentifier as OID
from utils.models.power import Power
from utils.models.pdu import PDU
from utils.models.systems import Systems

load_dotenv()

logging.basicConfig(
    level=logging.INFO, format="[%(asctime)s] %(message)s", datefmt="%Y-%m-%d %H:%M:%S"
)

#edit this part to add more PDU
PDU_db = [
    {"hostname": "pdu-odcdh3-b04-2.amd.com", "site": "odcdh3", "location": "b04-2", "output_power_total_oid": "1.3.6.1.4.1.850.1.1.3.2.2.1.1.9.1", "v2c": "amd123"},
]



async def snmpFetch(pdu_hostname: str, oid: str, v2c: str, type: str):
    """
    Fetch SNMP data from a remote host using the provided OID and v2c community string.
    :param pdu_hostname: The hostname of the remote host
    :param oid: oid
    :param v2c: v2c Community string for SNMP access
    :param type: The type of data to fetch (temp or power)
    """
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


def seedPDU():
    """
    Upload PDU data to the database after verification
    """
    current_time = datetime.now()
    for pdu in PDU_db:
        pdu_hostname = pdu["hostname"]
        site = pdu["site"]
        oid = pdu["output_power_total_oid"]
        location = pdu["location"]
        v2c = pdu["v2c"]

        pdu_obj = PDU()
        pdu_obj.create(
            {
                "hostname": pdu_hostname,
                "output_power_total_oid": oid,
                "site": site,
                "v2c": v2c,
                "location": location,
                "created": current_time,
                "updated": current_time,
            }
        )


def test_temperature_oid():
    """
    Test the temperature OID by fetching temperature data from the PDU
    """
    try:
        created_time = datetime.now()  # ensure consistency
        pdu = PDU()

        for pdu_data in PDU_db:
            pdu_hostname = pdu_data["hostname"]
            site = pdu_data["site"]
            oid = pdu_data["output_power_total_oid"]
            location = pdu_data["location"]
            temperature = asyncio.run(snmpFetch(pdu_hostname, oid, "amd123", "temp"))
            print(pdu_hostname, f"Temperature:{temperature}C")
    except Exception as e:
        print(e)


def test_temperature_exists():
    pdu = PDU()
    test = pdu.find({"temperature": {"$exists": True}})

    for temp in test:
        print(temp["hostname"])
    print(test)


def test_power_oid():
    try:
        created_time = datetime.now()  # ensure consistency
        pdu = PDU()

        for pdu_data in PDU_db:
            pdu_hostname = pdu_data["hostname"]
            site = pdu_data["site"]
            oid = pdu_data["output_power_total_oid"]
            location = pdu_data["location"]
            power = asyncio.run(snmpFetch(pdu_hostname, oid, "amd123", "power"))
            print(pdu_hostname, f"Power:{power}W")
    except Exception as e:
        print(e)


def update_pdu_with_temp():
    """
    Update PDU with temperature object
    """
    pdu_id = "68381984364f2a1644485876"
    pdu = PDU()
    pdu.update(
        pdu_id,
        {
            "temperature": {
                "oid": "1.3.6.1.4.1.850.1.1.3.3.3.1.1.1.2",
                "position": "down",
            }
        },
    )


def add_system_to_pdu(pdu_id, new_system):
    """
    Add a system value to the system list for a PDU, avoiding duplicates.
    """
    pdu = PDU()
    doc = pdu.find_by_id(pdu_id)
    if not isinstance(doc, dict):
        print(f"PDU with id {pdu_id} not found.")
        return
    systems = doc.get("system", [])
    if not isinstance(systems, list):
        systems = [systems] if systems else []
    if new_system not in systems:
        systems.append(new_system)
        pdu.update(pdu_id, {"system": systems})
        print(f"Added system '{new_system}' to PDU {pdu_id}.")
    else:
        print(f"System '{new_system}' already exists for PDU {pdu_id}.")


def add_system(system, site, location):
    """
    Add a system to the 'systems' collection with fields: system, site, location.
    """
    now = datetime.now()
    systems_model = Systems()
    doc = {
        "system": system,
        "site": site,
        "location": location,
        "created": now,
        "updated": now,
    }
    result = systems_model.create(doc)
    print(f"Added system '{system}' to systems collection. Result: {result}")


if __name__ == "__main__":
    # test_power_oid()
    # seedPDU() #add PDU to the database
    # seedPower()
    # test_temperature_oid()
    # update_pdu_with_system()
    # test_temperature_exists()
    # update_pdu_with_temp()
    # add_system_to_pdu("684251d6c644ba134955e98e", "gbt350-odcdh5-wbc2")
    # add_system("quanta325-odcdh3-b09-1", "odcdh3", "b09")
    pass
