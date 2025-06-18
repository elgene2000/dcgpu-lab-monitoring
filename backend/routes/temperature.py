# import json
from flask import Blueprint, request
from utils.models.temperature import Temperature
from datetime import datetime
# from collections import defaultdict
from dateutil.relativedelta import relativedelta

temperature = Blueprint("temperature", __name__)

@temperature.route("", methods=["GET"])
def get_temperature():
    try:
        site = request.args.get("site")
        location = request.args.get("location")
        timeline = request.args.get("timeline")

        query_filter = {}
        if site:
            query_filter["site"] = site
        if location:
            query_filter["location"] = location
        if timeline:
            start_time = datetime.now()
            if timeline == "24h":
                start_time = start_time - relativedelta(hours=24)
            elif timeline == "7d":
                start_time = start_time - relativedelta(days=7)
            elif timeline == "1mnth":
                start_time = start_time - relativedelta(months=1)
            query_filter["created"] = {"$gte": start_time}

        temperature = Temperature()

        results = temperature.find(query_filter, sort=[("created", 1)])
        return results
    except Exception as e:
        return {"status": "error", "data": str(e)}

@temperature.route("latest", methods=["GET"])
def latest():
    try:
        site = request.args.get("site")
        location = request.args.get("location")
        query_filter = {}
        if site:
            query_filter["site"] = site
        if location:
            query_filter["location"] = location

        temperature = Temperature()
        latest = temperature.find(query_filter, sort=[("created", -1)], limit=1)

        if latest:
            created = latest[0]["created"]
            query_filter["created"] = created

        results = temperature.find(query_filter, sort=[("created", -1)])
        return results
    except Exception as e:
        return {"status": "error", "data": str(e)}