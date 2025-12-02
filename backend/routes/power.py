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

def query_power_in_batches(power_model, query_filter, start_date, end_date, max_days=7):
    """Query power data in batches to avoid large date range errors"""
    adjusted_end_date = end_date + timedelta(days=1)
    batches = get_date_batches(start_date, adjusted_end_date, max_days)
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
        aggregate = request.args.get("aggregate")  # New parameter for aggregated data

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
                start_time = current_time.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
                
                # Check if aggregated data is requested or if this is likely for charts
                if aggregate == "true" or request.headers.get('X-Request-Type') == 'chart':
                    # Return aggregated hourly data instead of raw readings
                    return get_aggregated_power_data(power_model, query_filter, start_time, current_time, site)
                else:
                    # For raw data requests (like table calculations), use batched queries
                    results = query_power_in_batches(power_model, query_filter, start_time, current_time)
                
            else:
                # For any other timeline, assume it might be large and use batching
                start_time = current_time.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
                results = query_power_in_batches(power_model, query_filter, start_time, current_time)
        else:
            # No timeline specified, use direct query
            results = power_model.find(query_filter, sort=[("created", 1)])
            
        return results
        
    except Exception as e:
        return {"status": "error", "data": str(e)}


def get_aggregated_power_data(power_model, query_filter, start_time, end_time, site):
    """Return aggregated hourly power data for charts - much smaller payload"""
    try:
        # Use batched queries to get all data
        all_readings = query_power_in_batches(power_model, query_filter, start_time, end_time, max_days=2)
        
        # Group by hour and location, then aggregate
        hourly_data = {}
        
        for reading in all_readings:
            # Round timestamp to nearest hour
            timestamp = reading.get('created')
            if isinstance(timestamp, str):
                timestamp = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
            
            hour_key = timestamp.replace(minute=0, second=0, microsecond=0)
            location = reading.get('location', 'unknown')
            power_value = reading.get('reading', 0)
            
            # Create composite key
            key = f"{hour_key}|{location}"
            
            if key not in hourly_data:
                hourly_data[key] = {
                    'created': hour_key.isoformat(),
                    'location': location,
                    'site': site,
                    'readings': [],
                    'count': 0
                }
            
            hourly_data[key]['readings'].append(power_value)
            hourly_data[key]['count'] += 1
        
        # Calculate average for each hour/location
        aggregated_results = []
        for data in hourly_data.values():
            if data['readings']:
                avg_reading = sum(data['readings']) / len(data['readings'])
                aggregated_results.append({
                    'created': data['created'],
                    'location': data['location'], 
                    'site': data['site'],
                    'reading': round(avg_reading, 2),
                    'sample_count': data['count']
                })
        
        # Sort by timestamp
        aggregated_results.sort(key=lambda x: x['created'])
        
        print(f"Aggregated {len(all_readings)} raw readings into {len(aggregated_results)} hourly averages for {site}")
        return aggregated_results
        
    except Exception as e:
        print(f"Error in aggregated power data: {e}")
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


# Add this new route to your power.py file

@power.route("monthly-summary", methods=["GET"])
def get_monthly_summary():
    """Get pre-calculated monthly power summaries for current and previous month"""
    try:
        sites = request.args.get("sites", "").split(",") or ["odcdh1", "odcdh2", "odcdh3", "odcdh5"]
        
        current_date = datetime.now()
        
        # Current month boundaries
        current_month_start = datetime(current_date.year, current_date.month, 1)
        current_month_end = current_date
        
        # Previous month boundaries  
        if current_date.month == 1:
            prev_month_start = datetime(current_date.year - 1, 12, 1)
            prev_month_end = datetime(current_date.year, 1, 1) - timedelta(seconds=1)
        else:
            prev_month_start = datetime(current_date.year, current_date.month - 1, 1) 
            prev_month_end = datetime(current_date.year, current_date.month, 1) - timedelta(seconds=1)
        
        power_model = Power()
        results = {}
        
        for site in sites:
            try:
                # Query current month with batching
                current_readings = query_power_in_batches(
                    power_model, 
                    {"site": site}, 
                    current_month_start, 
                    current_month_end,
                    max_days=3
                )
                
                # Query previous month with batching
                prev_readings = query_power_in_batches(
                    power_model,
                    {"site": site},
                    prev_month_start,
                    prev_month_end, 
                    max_days=3
                )
                
                # Calculate energy totals (server-side)
                current_energy = sum((reading.get("reading", 0) * (10 / 60)) for reading in current_readings) / 1000  # kWh
                prev_energy = sum((reading.get("reading", 0) * (10 / 60)) for reading in prev_readings) / 1000  # kWh
                
                # Calculate percentage change
                change = ((current_energy - prev_energy) / prev_energy * 100) if prev_energy > 0 else 0
                
                results[site] = {
                    "current_month_kwh": round(current_energy, 2),
                    "previous_month_kwh": round(prev_energy, 2), 
                    "percentage_change": round(change, 1),
                    "current_month_readings_count": len(current_readings),
                    "previous_month_readings_count": len(prev_readings)
                }
                
            except Exception as e:
                print(f"Error processing site {site}: {e}")
                results[site] = {
                    "current_month_kwh": 0,
                    "previous_month_kwh": 0,
                    "percentage_change": 0,
                    "error": str(e)
                }
        
        # Calculate totals
        total_current = sum(site_data.get("current_month_kwh", 0) for site_data in results.values())
        total_previous = sum(site_data.get("previous_month_kwh", 0) for site_data in results.values())
        total_change = ((total_current - total_previous) / total_previous * 100) if total_previous > 0 else 0
        
        return {
            "sites": results,
            "totals": {
                "current_month_kwh": round(total_current, 2),
                "previous_month_kwh": round(total_previous, 2),
                "percentage_change": round(total_change, 1)
            },
            "month_info": {
                "current_month": current_month_start.strftime("%B %Y"),
                "previous_month": prev_month_start.strftime("%B %Y")
            }
        }
        
    except Exception as e:
        return {"status": "error", "data": str(e)}


# Add this route to power.py for the MonthlyPowerTable

@power.route("historical-summary", methods=["GET"])
def get_historical_summary():
    """Get historical monthly summaries for the past 12 months"""
    try:
        months_back = int(request.args.get("months", 12))
        sites = ["odcdh1", "odcdh2", "odcdh3", "odcdh4", "odcdh5"]
        
        current_date = datetime.now()
        results = []
        power_model = Power()
        
        for i in range(months_back):
            # Calculate month boundaries
            if current_date.month - i <= 0:
                year = current_date.year - 1
                month = 12 + (current_date.month - i)
            else:
                year = current_date.year
                month = current_date.month - i
            
            month_start = datetime(year, month, 1)
            
            # Calculate month end
            if month == 12:
                month_end = datetime(year + 1, 1, 1) - timedelta(seconds=1)
            else:
                month_end = datetime(year, month + 1, 1) - timedelta(seconds=1)
            
            month_name = month_start.strftime("%B %Y")
            
            # For current month, only go up to now
            if i == 0:
                month_end = min(month_end, current_date)
            
            month_data = {
                "month": month_name,
                "dh1": 0,
                "dh2": 0,
                "dh3": 0,
                "dh4": 0,
                "dh5": 0,
                "total": 0,
                "openDcFacilityPower": 0,
                "pue": 0,
            }
            
            # Query each site for this month
            for site in sites:
                try:
                    # Use smaller batches (1-2 days) for historical data
                    readings = query_power_in_batches(
                        power_model,
                        {"site": site},
                        month_start,
                        month_end,
                        max_days=2  # Very small batches for historical data
                    )
                    
                    # Calculate energy total
                    energy_kwh = sum((reading.get("reading", 0) * (10 / 60)) for reading in readings) / 1000
                    
                    # Map site to column
                    column_map = {
                        "odcdh1": "dh1",
                        "odcdh2": "dh2",
                        "odcdh3": "dh3",
                        "odcdh4": "dh4",
                        "odcdh5": "dh5"
                    }
                    
                    if site in column_map:
                        month_data[column_map[site]] = round(energy_kwh, 2)
                    
                    print(f"  {site} for {month_name}: {energy_kwh:.2f} kWh ({len(readings)} readings)")
                    
                except Exception as e:
                    print(f"Error processing {site} for {month_name}: {e}")
                    # Continue with other sites
                    continue
            
            # Calculate total
            month_data["total"] = round(
                month_data["dh1"] + month_data["dh2"] + month_data["dh3"] + 
                month_data["dh4"] + month_data["dh5"], 2
            )
            
            results.append(month_data)
            print(f"Completed {month_name}: {month_data['total']} kWh total")
        
        # Reverse to get chronological order (oldest first)
        results.reverse()
        
        return {
            "months": results,
            "generated_at": datetime.now().isoformat(),
            "note": "Pre-calculated historical summaries - much faster than raw data"
        }
        
    except Exception as e:
        return {"status": "error", "data": str(e)}


# Also add a route to get just current month live calculation
@power.route("current-month-summary", methods=["GET"])
def get_current_month_summary():
    """Get current month summary with live data"""
    try:
        sites = ["odcdh1", "odcdh2", "odcdh3", "odcdh4", "odcdh5"]
        
        current_date = datetime.now()
        month_start = datetime(current_date.year, current_date.month, 1)
        
        power_model = Power()
        current_month_data = {
            "month": month_start.strftime("%B %Y"),
            "dh1": 0,
            "dh2": 0,
            "dh3": 0,
            "dh4": 0,
            "dh5": 0,
            "total": 0,
            "openDcFacilityPower": 0,
            "pue": 0,
        }
        
        for site in sites:
            try:
                readings = query_power_in_batches(
                    power_model,
                    {"site": site},
                    month_start,
                    current_date,
                    max_days=2
                )
                
                energy_kwh = sum((reading.get("reading", 0) * (10 / 60)) for reading in readings) / 1000
                
                column_map = {
                    "odcdh1": "dh1",
                    "odcdh2": "dh2",
                    "odcdh3": "dh3", 
                    "odcdh4": "dh4",
                    "odcdh5": "dh5"
                }
                
                if site in column_map:
                    current_month_data[column_map[site]] = round(energy_kwh, 2)
                    
            except Exception as e:
                print(f"Error processing {site}: {e}")
                continue
        
        current_month_data["total"] = round(
            current_month_data["dh1"] + current_month_data["dh2"] + 
            current_month_data["dh3"] + current_month_data["dh4"] + 
            current_month_data["dh5"], 2
        )
        
        return {
            "current_month": current_month_data,
            "generated_at": datetime.now().isoformat(),
            "is_live": True
        }
        
    except Exception as e:
        return {"status": "error", "data": str(e)}