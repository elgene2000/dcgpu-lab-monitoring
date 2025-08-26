import json
from datetime import datetime, timedelta
from flask import Blueprint, request
from utils.models.power import Power
from dateutil.relativedelta import relativedelta

power = Blueprint("power", __name__)

def get_date_batches(start_date, end_date, max_days=7):
    """Split a date range into batches of max_days or less"""
    batches = []
    current_start = start_date
    
    while current_start < end_date:
        # Calculate the end of current batch
        current_end = min(current_start + timedelta(days=max_days), end_date)
        batches.append((current_start, current_end))
        current_start = current_end
    
    return batches

def query_power_in_batches(power_model, query_filter, start_date, end_date):
    """Query power data in batches to avoid large date range errors"""
    batches = get_date_batches(start_date, end_date)
    all_results = []
    
    for batch_start, batch_end in batches:
        batch_filter = query_filter.copy()
        batch_filter["created"] = {"$gte": batch_start, "$lt": batch_end}
        
        try:
            batch_results = power_model.find(batch_filter, sort=[("created", 1)])
            all_results.extend(batch_results)
        except Exception as e:
            print(f"Error querying batch {batch_start} to {batch_end}: {e}")
            # Continue with other batches even if one fails
            continue
    
    return all_results

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
        
        power_model = Power()
        
        if timeline:
            current_time = datetime.now()
            
            if timeline == "24h":
                start_time = current_time - relativedelta(hours=24)
                # For 24h, use direct query (no batching needed)
                query_filter["created"] = {"$gte": start_time}
                results = power_model.find(query_filter, sort=[("created", 1)])
                
            elif timeline == "7d":
                start_time = current_time - relativedelta(days=7)
                # For 7d, use direct query (no batching needed)
                query_filter["created"] = {"$gte": start_time}
                results = power_model.find(query_filter, sort=[("created", 1)])
                
            elif timeline == "1mnth":
                start_time = current_time - relativedelta(days=30)
                # For 1 month, use batched queries
                results = query_power_in_batches(power_model, query_filter, start_time, current_time)
                
            else:
                # For any other timeline, assume it might be large and use batching
                start_time = current_time - relativedelta(days=30)
                results = query_power_in_batches(power_model, query_filter, start_time, current_time)
        else:
            # No timeline specified, use direct query
            results = power_model.find(query_filter, sort=[("created", 1)])
            
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