
import json
from datetime import datetime
from flask import Blueprint
from utils.models.ssb import SSB
from dateutil.relativedelta import relativedelta

ssb = Blueprint("ssb", __name__)

@ssb.route("24h", methods=["GET"])
def get_24h_power():
    try:
        # last 24hours
        last_24h_timestamp = datetime.now() - relativedelta(hours=24)

        ssb = SSB()
        all_ssb = ssb.find({"created": {"$gte": last_24h_timestamp}}, sort=[("created", 1)])
        return {"status": "success", "data": all_ssb}
    except Exception as e:
        return {"status": "error", "data": str(e)}
    
@ssb.route("7d", methods=["GET"])
def get_7d_power():
    try:
        # last 7 days
        last_7d_timestamp = datetime.now() - relativedelta(days=7)

        ssb = SSB()
        all_ssb = ssb.find(
            {"created": {"$gte": last_7d_timestamp}}, sort=[("created", 1)]
        )

        return {"status": "success", "data": all_ssb}
    except Exception as e:
        return {"status": "error", "data": str(e)}
    
@ssb.route("1mnth", methods=["GET"])
def get_1mth_power():
    try:
        # last 1 month
        last_1mnth_timestamp = datetime.now() - relativedelta(months=1)

        ssb = SSB()
        all_ssb = ssb.find(
            {"created": {"$gte": last_1mnth_timestamp}}, sort=[("created", 1)]
        )

        return {"status": "success", "data": all_ssb}
    except Exception as e:
        return {"status": "error", "data": str(e)}
    
@ssb.route("current_reading", methods=["GET"])
def get_current_power():
    try:
        ssb = SSB()
        res = {}

        current_ssb = ssb.find({}, sort=[("created", -1)], limit=1)
        if current_ssb:
            res["reading"] = current_ssb[0]["reading"]
            res["created"] = current_ssb[0]["created"]
            res["symbol"] = current_ssb[0]["symbol"]

        return {"status": "success", "data": res}
    except Exception as e:
        return {"status": "error", "data": str(e)}
