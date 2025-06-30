import json
from flask import Blueprint, request
from collections import defaultdict
from utils.models.power import Power
from utils.factory.redis_client import redis
from datetime import datetime
from dateutil.relativedelta import relativedelta
dashboard = Blueprint("dashboard", __name__)

@dashboard.route("", methods=["GET"])
def get_total_power():
    try:
        datahall_total_power = redis.get("datahall_total_power")

        if datahall_total_power:
            result = json.loads(datahall_total_power)
            return result

        power = Power()
        latest = power.find({}, sort=[("created", -1)], limit=1)

        if not latest:
            return {}

        query_filter = {}
        query_filter["created"] = latest[0]["created"]

        total_power = power.find(query_filter, sort=[("created", -1)])

        if not total_power:
            return {}

        result = defaultdict(int)
        for power in total_power:
            result[power["site"]] += power["reading"]

        ##remove afterwards DH2 is ready!
        for site in ["odcdh2"]:
            result[site] += 0

        # store in Redis with 10mins TTL
        redis.setex("datahall_total_power", 600, str(json.dumps(dict(result))))
        return result
    except Exception as e:
        return {"status": "error", "data": str(e)}
    
@dashboard.route("total-power", methods=["GET"])
def get_site_total_power():
    try:
        site = request.args.get("site")
        timeline = request.args.get("timeline")

        query_filter = {}
        site_total_power = None
        if site:
            query_filter["site"] = site
            
        if timeline:
            start_time = datetime.now()
            site_total_power = redis.get(f"{site}_total_power_{timeline}")
            if timeline == "24h":
                start_time = start_time - relativedelta(hours=24)
            elif timeline == "7d":
                start_time = start_time - relativedelta(days=7)
            elif timeline == "1mnth":
                start_time = start_time - relativedelta(months=1)
            query_filter["created"] = {"$gte": start_time}

        if site_total_power:
            return json.loads(site_total_power)

        power = Power()
        all_power = power.find(query_filter, sort=[("created", 1)])

        grouped = {}

        for item in all_power:
            dt_minute = item["created"].replace(second=0, microsecond=0)

            if dt_minute not in grouped:
                grouped[dt_minute] = {
                    "created": dt_minute.isoformat(),
                    "reading": item["reading"],
                    "site": item["site"],
                    "symbol": item["symbol"],
                }
            else:
                grouped[dt_minute]["reading"] += item["reading"]

        results = list(grouped.values())

        # store in Redis with 10mins TTL
        redis.setex(f"{site}_total_power_{timeline}", 600, json.dumps(results)) 
        return results
    except Exception as e:
        return {"status": "error", "data": str(e)}
