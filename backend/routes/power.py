
import json
from datetime import datetime
from flask import Blueprint, request
from utils.models.power_sensor import PowerSensor
from dateutil.relativedelta import relativedelta

power_sensor = Blueprint("power_sensor", __name__)

@power_sensor.route("24h", methods=["GET"])
def get_24h_power():
    try:
        # last 24hours
        last_24h_timestamp = datetime.now() - relativedelta(hours=24)

        power_sensor = PowerSensor()
        all_power = power_sensor.find({"created": {"$gte": last_24h_timestamp}}, sort=[("created", 1)])
        return {"status": "success", "data": all_power}
    except Exception as e:
        return {"status": "error", "data": str(e)}
    
@power_sensor.route("7d", methods=["GET"])
def get_7d_temp():
    try:
        # last 7 days
        last_7d_timestamp = datetime.now() - relativedelta(days=7)

        power_sensor = PowerSensor()
        all_power = power_sensor.find(
            {"created": {"$gte": last_7d_timestamp}}, sort=[("created", 1)]
        )

        return {"status": "success", "data": all_power}
    except Exception as e:
        return {"status": "error", "data": str(e)}
    
@power_sensor.route("1mnth", methods=["GET"])
def get_1mth_temp():
    try:
        # last 1 month
        last_1mnth_timestamp = datetime.now() - relativedelta(months=1)

        power_sensor = PowerSensor()
        all_power = power_sensor.find(
            {"created": {"$gte": last_1mnth_timestamp}}, sort=[("created", 1)]
        )

        return {"status": "success", "data": all_power}
    except Exception as e:
        return {"status": "error", "data": str(e)}
    
@power_sensor.route("current_reading", methods=["GET"])
def get_current_power():
    try:
        power_sensor = PowerSensor()
        pdu_ips = ["https://10.162.110.225/", "https://10.162.101.111/"]

        res = {}

        for ip in pdu_ips:
            current_power = power_sensor.find(
                {"pdu_ip": ip}, sort=[("created", -1)], limit=1
            )
            if current_power:
                res[ip] = {
                        "reading": current_power[0]["reading"],
                        "created": current_power[0]["created"],
                    }

        return {"status": "success", "data": res}
    except Exception as e:
        return {"status": "error", "data": str(e)}