import json
from datetime import datetime
from flask import Blueprint, request
from utils.models.power import Power
from dateutil.relativedelta import relativedelta

power = Blueprint("power", __name__)


@power.route("", methods=["GET"])
def get_power():
    try:
        site = request.args.get("site")
        location = request.args.get("location")
        timeline = request.args.get("timeline")

        query_filter = {}
        if site:
            query_filter["site"] = site
        if location:
            query_filter["location"] = { "$regex": location }
        if timeline:
            start_time = datetime.now()
            if timeline == "24h":
                start_time = start_time - relativedelta(hours=24)
            elif timeline == "7d":
                start_time = start_time - relativedelta(days=7)
            elif timeline == "1mnth":
                start_time = start_time - relativedelta(months=1)
            query_filter["created"] = {"$gte": start_time}

        power = Power()

        results = power.find(query_filter, sort=[("created", 1)])
        return results
    except Exception as e:
        return {"status": "error", "data": str(e)}

@power.route("latest", methods=["GET"])
def get_latest():
    try:
        site = request.args.get("site")
        location = request.args.get("location")
        query_filter = {}
        if site:
            query_filter["site"] = site
        if location:
            query_filter["location"] = { "$regex": location }

        power = Power()
        latest = power.find(query_filter, sort=[("created", -1)], limit=1)

        if latest:
            created = latest[0]["created"]
            query_filter["created"] = created

        results = power.find(query_filter, sort=[("created", -1)])
        return results
    except Exception as e:
        return {"status": "error", "data": str(e)}


# @power.route("24h", methods=["GET"])
# def get_24h_power():
#     try:
#         # last 24hours
#         last_24h_timestamp = datetime.now() - relativedelta(hours=24)

#         power_sensor = Power()
#         all_power = power_sensor.find(
#             {"created": {"$gte": last_24h_timestamp}}, sort=[("created", 1)]
#         )
#         return {"status": "success", "data": all_power}
#     except Exception as e:
#         return {"status": "error", "data": str(e)}


# @power.route("7d", methods=["GET"])
# def get_7d_temp():
#     try:
#         # last 7 days
#         last_7d_timestamp = datetime.now() - relativedelta(days=7)

#         power_sensor = Power()
#         all_power = power_sensor.find(
#             {"created": {"$gte": last_7d_timestamp}}, sort=[("created", 1)]
#         )

#         return {"status": "success", "data": all_power}
#     except Exception as e:
#         return {"status": "error", "data": str(e)}


# @power.route("1mnth", methods=["GET"])
# def get_1mth_temp():
#     try:
#         # last 1 month
#         last_1mnth_timestamp = datetime.now() - relativedelta(months=1)

#         power_sensor = Power()
#         all_power = power_sensor.find(
#             {"created": {"$gte": last_1mnth_timestamp}}, sort=[("created", 1)]
#         )

#         return {"status": "success", "data": all_power}
#     except Exception as e:
#         return {"status": "error", "data": str(e)}


# @power.route("current_reading", methods=["GET"])
# def get_current_power():
#     try:
#         power_sensor = Power()
#         pdu_ips = ["https://10.162.110.225/", "https://10.162.101.111/"]

#         res = {}

#         for ip in pdu_ips:
#             current_power = power_sensor.find(
#                 {"pdu_ip": ip}, sort=[("created", -1)], limit=1
#             )
#             if current_power:
#                 res[ip] = {
#                     "reading": current_power[0]["reading"],
#                     "created": current_power[0]["created"],
#                 }

#         return {"status": "success", "data": res}
#     except Exception as e:
#         return {"status": "error", "data": str(e)}
