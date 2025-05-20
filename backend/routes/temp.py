import json
from flask import Blueprint, request
from utils.models.temp_sensor import TempSensor
from datetime import datetime
from collections import defaultdict
from dateutil.relativedelta import relativedelta

temp_sensor = Blueprint("temp_sensor", __name__)


@temp_sensor.route("24h", methods=["GET"])
def get_24h_temp():
    try:
        location = str(request.args.get("location")).strip()
        if location == "":
            return {"status": "error", "data": "Location is required"}

        # last 24hours
        last_24h_timestamp = datetime.now() - relativedelta(hours=24)

        temp_sensor = TempSensor()
        all_temp = temp_sensor.find(
            {"created": {"$gte": last_24h_timestamp}, "location": location},
            sort=[("created", 1)],
        )

        return {"status": "success", "data": all_temp}
    except Exception as e:
        return {"status": "error", "data": str(e)}


@temp_sensor.route("7d", methods=["GET"])
def get_7d_temp():
    try:
        location = str(request.args.get("location")).strip()
        if location == "":
            return {"status": "error", "data": "Location is required"}
        
        # last 7 days
        last_7d_timestamp = datetime.now() - relativedelta(days=7)

        temp_sensor = TempSensor()
        all_temp = temp_sensor.find(
            {"created": {"$gte": last_7d_timestamp}, "location": location},
            sort=[("created", 1)],
        )

        return {"status": "success", "data": all_temp}
    except Exception as e:
        return {"status": "error", "data": str(e)}


@temp_sensor.route("1mnth", methods=["GET"])
def get_1mth_temp():
    try:
        location = str(request.args.get("location")).strip()
        if location == "":
            return {"status": "error", "data": "Location is required"}
        
        # last 1 month
        last_1mnth_timestamp = datetime.now() - relativedelta(months=1)

        temp_sensor = TempSensor()
        all_temp = temp_sensor.find(
            {"created": {"$gte": last_1mnth_timestamp}, "location": location}, sort=[("created", 1)]
        )

        return {"status": "success", "data": all_temp}
    except Exception as e:
        return {"status": "error", "data": str(e)}


@temp_sensor.route("current_reading", methods=["GET"])
def get_current_temp():
    try:
        temp_sensor = TempSensor()
        sensor_names = [
            "Sensor0013",
            "Sensor0019",
            "Sensor0111",
            "Sensor0114",
            "Sensor0118",
        ]

        res = {}

        for sensor_name in sensor_names:
            current_temp = temp_sensor.find(
                {"sensor_id": sensor_name}, sort=[("created", -1)], limit=1
            )
            if current_temp:
                res[sensor_name] = {
                    "reading": current_temp[0]["reading"],
                    "created": current_temp[0]["created"],
                }

        return {"status": "success", "data": res}
    except Exception as e:
        return {"status": "error", "data": str(e)}
