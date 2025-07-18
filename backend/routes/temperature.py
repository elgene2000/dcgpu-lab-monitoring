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
        from flask import current_app
        site = request.args.get("site")
        location = request.args.get("location")
        temperature_model = Temperature()
        collection = temperature_model.db.db[temperature_model.collection_name]

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