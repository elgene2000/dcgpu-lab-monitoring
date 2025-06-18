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