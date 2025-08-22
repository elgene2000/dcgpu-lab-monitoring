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
                start_time = start_time - relativedelta(days=30)
            query_filter["created"] = {"$gte": start_time}

        power = Power()

        results = power.find(query_filter, sort=[("created", 1)])
        return results
    except Exception as e:
        return {"status": "error", "data": str(e)}

@power.route("latest", methods=["GET"])
def get_latest():
    try:
        from flask import current_app
        site = request.args.get("site")
        location = request.args.get("location")
        power_model = Power()
        collection = power_model.db.db[power_model.collection_name]

        match_stage = {"site": site} if site else {}
        if location:
            match_stage["location"] = {"$regex": location}
        print("match_stage:", match_stage)
        pipeline = [
            {"$match": match_stage},
            {"$sort": {"location": 1, "created": -1}},
            {"$group": {
                "_id": "$location",
                "latest": {"$first": "$$ROOT"}
            }},
            {"$replaceRoot": {"newRoot": "$latest"}}
        ]
        results = list(collection.aggregate(pipeline))
        print("Aggregation results count:", len(results))
        for doc in results:
            if "_id" in doc:
                doc["_id"] = str(doc["_id"])
        return results
    except Exception as e:
        return {"status": "error", "data": str(e)}