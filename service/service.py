# import os
# import re
import time
import logging
import schedule
import asyncio

# import smtplib
from rpi import RPI
from datetime import datetime
from dotenv import load_dotenv
from puresnmp import Client, V2C, ObjectIdentifier as OID

from utils.models.ssb import SSB
from utils.models.temp_sensor import TempSensor

load_dotenv()

logging.basicConfig(
    level=logging.INFO, format="[%(asctime)s] %(message)s", datefmt="%Y-%m-%d %H:%M:%S"
)

PDU = [
    {
        "ip": "10.162.110.225",
        "sensors": [
            {"name": "Sensor0019", "oid": "1.3.6.1.4.1.850.1.1.3.3.3.1.1.1.3"},
            {"name": "Sensor0114", "oid": "1.3.6.1.4.1.850.1.1.3.3.3.1.1.1.2"},
        ],
        "power_oid": "1.3.6.1.4.1.850.1.1.3.2.2.1.1.9.1",
        "v2c": "public1",
    },
    {
        "ip": "10.162.101.111",
        "sensors": [
            {"name": "Sensor0111", "oid": "1.3.6.1.4.1.850.1.1.3.3.3.1.1.1.2"},
            # {"name": "Sensor0013", "oid": "1.3.6.1.4.1.850.1.1.3.3.3.1.1.1.3"},
        ],
        "power_oid": "1.3.6.1.4.1.850.1.1.3.2.2.1.1.9.1",
        "v2c": "public1",
    },
    {
        "ip": "10.162.101.138",
        "sensors": [
            {"name": "Sensor0118", "oid": "1.3.6.1.4.1.850.1.1.3.3.3.1.1.1.4"},
        ],
        "power_oid": "1.3.6.1.4.1.850.1.1.3.2.2.1.1.9.1",
        "v2c": "public1",
    },
]


async def snmpFetch(pdu_hostname: str, oid: str, v2c: str, type: str):
    try:
        print(pdu_hostname, oid, v2c, type)
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


def image_processing_job(created_time):
    MAX_RETRIES = 5

    try:
        for _ in range(1, MAX_RETRIES + 1):
            rpi = RPI()
            rpi.capture_snapshot()
            rpi.save_snapshot()
            finalized = rpi.preprocess_image(ori_file_path=rpi.local_file_path)
            ocr_result_list = rpi.ocr_read_text(file_path=finalized)

            if ocr_result_list:
                ocr_result = ocr_result_list[0]
                if rpi.validate_result(ocr_result):
                    # temporarily collect high readings for comparison
                    if float(ocr_result) > 40:
                        rpi.temp_dump_high_readings(created_time)
                    return round(float(ocr_result), 3)

        return None
    except Exception as e:
        logging.info(e)
        return None


def main_job():
    try:
        insert_db = False
        created_time = datetime.now()  # ensure consistency
        temp_list = []

        # TEMP
        for pdu in PDU:
            pdu_ip = pdu["ip"]
            v2c = pdu["v2c"]
            sensors = pdu["sensors"]

            for sensor in sensors:
                sensor_name = sensor["name"]
                oid = sensor["oid"]

                temp = asyncio.run(snmpFetch(pdu_ip, oid, v2c, "temp"))
                if temp:
                    temp_list.append(
                        {
                            "sensor_id": sensor_name,
                            "reading": float(temp),
                            "pdu_ip": pdu_ip,
                            "symbol": "°C",
                            "created": created_time,
                            "location": "ust_lab_3",
                        }
                    )
        # POWER
        # power_reading = image_processing_job(created_time)

        # upload to DB:
        tempSensor = TempSensor()
        # ssb = SSB()
        if temp_list:
            for temp in temp_list:
                tempSensor.create(temp)
                insert_db = True

            # if power_reading:
            #     ssb.create(
            #         {
            #             "reading": power_reading,
            #             "symbol": "kW",
            #             "created": created_time,
            #             "location": "ust_lab_3",
            #         }
            #     )
            insert_db = True
        if insert_db:
            logging.info("Inserted into DB")
    except Exception as e:
        logging.info(e)


if __name__ == "__main__":
    # schedule.every(1).minutes.do(main_job)
    # logging.info("Web Scrapping CRON Task Started...")
    # while True:
    #     schedule.run_pending()
    #     time.sleep(5)
    #     logging.info("Waiting for next schedule...\n")
    main_job()
