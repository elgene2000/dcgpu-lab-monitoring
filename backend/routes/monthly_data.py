# backend/routes/monthly_data.py
import json
import os
from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify
from dateutil.relativedelta import relativedelta
from utils.models.power import Power

monthly_data = Blueprint("monthly_data", __name__)

# Path to store the JSON file
DATA_FILE_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'monthly_power_data.json')

def ensure_data_directory():
    """Ensure the data directory exists"""
    data_dir = os.path.dirname(DATA_FILE_PATH)
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)

def load_monthly_data():
    """Load monthly data from JSON file"""
    try:
        if os.path.exists(DATA_FILE_PATH):
            with open(DATA_FILE_PATH, 'r') as f:
                return json.load(f)
        return []
    except Exception as e:
        print(f"Error loading monthly data: {e}")
        return []

def save_monthly_data(data):
    """Save monthly data to JSON file"""
    try:
        ensure_data_directory()
        with open(DATA_FILE_PATH, 'w') as f:
            json.dump(data, f, indent=2, default=str)
        return True
    except Exception as e:
        print(f"Error saving monthly data: {e}")
        return False

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

def query_power_data_for_month(site, start_date, end_date):
    """Query power data for a specific month using batched queries"""
    power = Power()
    all_readings = []
    
    # Include the full last day
    adjusted_end_date = end_date + timedelta(days=1)
    batches = get_date_batches(start_date, adjusted_end_date)
 
    print(f"Querying {site} from {start_date} to {end_date} in {len(batches)} batches")
    
    for batch_start, batch_end in batches:
        try:
            query_filter = {
                "site": site,
                "created": {
                    "$gte": batch_start,
                    "$lt": batch_end
                }
            }
            
            batch_readings = power.find(query_filter, sort=[("created", 1)])
            all_readings.extend(batch_readings)
            print(f"  Batch {batch_start.strftime('%Y-%m-%d')} to {batch_end.strftime('%Y-%m-%d')}: {len(batch_readings)} readings")
            
        except Exception as e:
            print(f"Error querying batch {batch_start} to {batch_end} for {site}: {e}")
            # Continue with other batches even if one fails
            continue
    
    return all_readings

def auto_save_previous_month():
    """Automatically save previous month's data if not already saved"""
    try:
        # Get previous month details
        current_date = datetime.now()
        first_day_current = datetime(current_date.year, current_date.month, 1)
        first_day_previous = first_day_current - relativedelta(months=1)
        last_day_previous = first_day_current - timedelta(days=1)
        
        previous_month = first_day_previous.strftime("%B %Y")
        
        # Load existing data
        existing_data = load_monthly_data()
        
        # Check if previous month data already exists
        existing_months = [item.get('month') for item in existing_data]
        if previous_month in existing_months:
            print(f"Data for {previous_month} already exists")
            return
        
        print(f"Auto-saving data for {previous_month}")
        
        # Fetch previous month data for all sites using batched queries
        sites = ["odcdh1", "odcdh2", "odcdh3", "odcdh4", "odcdh5"]
        site_totals = {}
        
        for site in sites:
            print(f"Processing site: {site}")
            
            # Use batched query for the entire previous month
            readings = query_power_data_for_month(site, first_day_previous, first_day_current)
            site_total = 0
            
            for reading in readings:
                # Convert power reading to energy (10-minute intervals)
                energy_wh = reading.get("reading", 0) * (10 / 60)  # Watt-hours
                site_total += energy_wh
            
            # Convert to kWh and map to column names
            column_map = {
                "odcdh1": "dh1",
                "odcdh2": "dh2", 
                "odcdh3": "dh3",
                "odcdh4": "dh4",
                "odcdh5": "dh5"
            }
            site_totals[column_map[site]] = site_total / 1000  # Convert to kWh
            print(f"  {site} total: {site_total / 1000:.2f} kWh")
        
        # Calculate total
        total = sum(site_totals.values())
        
        # Create new month record
        new_month_data = {
            "month": previous_month,
            "dh1": site_totals.get("dh1", 0),
            "dh2": site_totals.get("dh2", 0),
            "dh3": site_totals.get("dh3", 0),
            "dh4": site_totals.get("dh4", 0),
            "dh5": site_totals.get("dh5", 0),
            "total": total,
            "openDcFacilityPower": 0,  # To be filled manually
            "pue": 0,  # Will be calculated when facility power is entered
            "auto_saved": True,
            "saved_date": datetime.now().isoformat()
        }
        
        # Add to existing data and save
        existing_data.append(new_month_data)
        save_monthly_data(existing_data)
        print(f"Successfully auto-saved data for {previous_month}")
        
    except Exception as e:
        print(f"Error in auto-save previous month: {e}")

@monthly_data.route("", methods=["GET"])
def get_monthly_data():
    """Get monthly power data from JSON file"""
    try:
        # Auto-save previous month if needed (runs on first request of new month)
        auto_save_previous_month()
        
        data = load_monthly_data()
        return data
    except Exception as e:
        return {"status": "error", "data": str(e)}

@monthly_data.route("", methods=["POST"])
def save_monthly_data_endpoint():
    """Save monthly power data to JSON file"""
    try:
        request_data = request.get_json()
        if not request_data or 'data' not in request_data:
            return {"status": "error", "message": "No data provided"}
        
        data = request_data['data']
        
        # Add last updated timestamp
        for item in data:
            item['last_updated'] = datetime.now().isoformat()
        
        success = save_monthly_data(data)
        
        if success:
            return {"status": "success", "message": "Data saved successfully"}
        else:
            return {"status": "error", "message": "Failed to save data"}
            
    except Exception as e:
        return {"status": "error", "data": str(e)}

@monthly_data.route("/auto-save", methods=["POST"])
def trigger_auto_save():
    """Manually trigger auto-save for previous month (for testing)"""
    try:
        auto_save_previous_month()
        return {"status": "success", "message": "Auto-save completed"}
    except Exception as e:
        return {"status": "error", "data": str(e)}


@monthly_data.route("/compare", methods=["GET"])
def compare_months():
    try:
        site = request.args.get("site")
        if not site:
            return {"status": "error", "message": "site parameter required"}, 400

        current_date = datetime.now()
        first_day_current = datetime(current_date.year, current_date.month, 1)
        first_day_previous = first_day_current - relativedelta(months=1)
        last_day_previous = first_day_current - timedelta(days=1)

        # Query both months in batches
        readings_current = query_power_data_for_month(site, first_day_current, current_date)
        readings_previous = query_power_data_for_month(site, first_day_previous, first_day_current)

        def total_energy(readings):
            total = 0
            for r in readings:
                energy_wh = r.get("reading", 0) * (10 / 60)  # convert to Wh
                total += energy_wh
            return total / 1000  # kWh

        site_current_total = total_energy(readings_current)
        site_previous_total = total_energy(readings_previous)

        site_change = site_previous_total > 0 and (
            (site_current_total - site_previous_total) / site_previous_total * 100
        ) or 0

        return {
            "site": site,
            "current": site_current_total,
            "previous": site_previous_total,
            "change": site_change,
        }
    except Exception as e:
        return {"status": "error", "data": str(e)}, 500
