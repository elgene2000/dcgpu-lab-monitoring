from flask import Blueprint, request
from datetime import datetime
from dateutil.relativedelta import relativedelta

# Import models with error handling
try:
    from utils.models.system_temperature import SystemTemperature
    system_temperature_available = True
except ImportError as e:
    print(f"SystemTemperature model not found: {e}")
    system_temperature_available = False

try:
    from utils.models.systems import Systems
    systems_available = True
except ImportError as e:
    print(f"Systems model not found: {e}")
    systems_available = False

system_temperature = Blueprint("system_temperature", __name__)

@system_temperature.route("", methods=["GET"])
def get_system_temperatures():
    try:
        if not system_temperature_available:
            return {"status": "error", "data": "SystemTemperature model not available"}
            
        system = request.args.get("system")
        timeline = request.args.get("timeline")

        query_filter = {}
        if system:
            query_filter["system"] = system
            
        if timeline:
            start_time = datetime.now()
            if timeline == "24h":
                start_time = start_time - relativedelta(hours=24)
            elif timeline == "7d":
                start_time = start_time - relativedelta(days=7)
            elif timeline == "1mnth":
                start_time = start_time - relativedelta(days=30)
            query_filter["created"] = {"$gte": start_time}

        system_temp = SystemTemperature()
        results = system_temp.find(query_filter, sort=[("created", -1)])
        
        return results
    except Exception as e:
        return {"status": "error", "data": str(e)}

@system_temperature.route("latest", methods=["GET"])
def get_latest_system_temperatures():
    try:
        if not system_temperature_available:
            return {"status": "error", "data": "SystemTemperature model not available"}
        if not systems_available:
            return {"status": "error", "data": "Systems model not available"}
            
        # Get expected systems from systems collection
        systems_model = Systems()
        expected_systems = systems_model.find({})
        expected_system_names = {system["system"] for system in expected_systems}
        
        system_temp = SystemTemperature()
        collection = system_temp.db.db[system_temp.collection_name]
        
        # Get the latest temperature reading for each system
        pipeline = [
            {"$sort": {"system": 1, "created": -1}},
            {"$group": {
                "_id": "$system",
                "latest": {"$first": "$$ROOT"}
            }},
            {"$replaceRoot": {"newRoot": "$latest"}},
            {"$sort": {"system": 1}}
        ]
        
        temp_results = list(collection.aggregate(pipeline))
        
        # Convert ObjectId to string
        for doc in temp_results:
            if "_id" in doc:
                doc["_id"] = str(doc["_id"])
        
        # Add metadata about system coverage
        systems_with_temps = {result["system"] for result in temp_results}
        
        result = {
            "temperature_data": temp_results,
            "system_coverage": {
                "total_expected_systems": len(expected_system_names),
                "systems_with_temperature_data": len(systems_with_temps),
                "systems_never_reported": list(expected_system_names - systems_with_temps),
                "unexpected_systems": list(systems_with_temps - expected_system_names)
            }
        }
                
        return result
    except Exception as e:
        return {"status": "error", "data": str(e)}