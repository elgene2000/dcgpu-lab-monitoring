import json
from flask import Blueprint
from collections import defaultdict
from utils.models.power import Power
from utils.factory.redis_client import redis

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

        ##remove afterwards DH1 and DH2 is ready!
        for site in ["odcdh1", "odcdh2"]:
            result[site] += 0

        # store in Redis with 10mins TTL
        redis.setex("datahall_total_power", 600, str(json.dumps(dict(result))))
        return result
    except Exception as e:
        return {"status": "error", "data": str(e)}
