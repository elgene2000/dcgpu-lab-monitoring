# backend/routes/power_capacity.py
import json
import os
from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify
from dateutil.relativedelta import relativedelta
from utils.models.power import Power

power_capacity = Blueprint("power_capacity", __name__)

# Path to store the JSON file
DATA_FILE_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'power_capacity_data.json')

def ensure_data_directory():
    """Ensure the data directory exists"""
    data_dir = os.path.dirname(DATA_FILE_PATH)
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)

def load_capacity_data():
    """Load capacity data from JSON file"""
    try:
        if os.path.exists(DATA_FILE_PATH):
            with open(DATA_FILE_PATH, 'r') as f:
                return json.load(f)
        return []
    except Exception as e:
        print(f"Error loading capacity data: {e}")
        return []

def save_capacity_data(data):
    """Save capacity data to JSON file"""
    try:
        ensure_data_directory()
        with open(DATA_FILE_PATH, 'w') as f:
            json.dump(data, f, indent=2, default=str)
        return True
    except Exception as e:
        print(f"Error saving capacity data: {e}")
        return False

def calculate_median(values):
    """Calculate median from a list of values"""
    if not values:
        return 0
    sorted_values = sorted(values)
    n = len(sorted_values)
    if n % 2 == 0:
        return (sorted_values[n//2 - 1] + sorted_values[n//2]) / 2
    else:
        return sorted_values[n//2]

def get_date_batches(start_date, end_date, max_days=7):
    """Split a date range into batches of max_days or less"""
    batches = []
    current_start = start_date
    
    while current_start < end_date:
        current_end = min(current_start + timedelta(days=max_days), end_date)
        batches.append((current_start, current_end))
        current_start = current_end
    
    return batches

def query_power_in_batches(power_model, query_filter, start_date, end_date, max_days=7):
    """Query power data in batches to avoid large date range errors"""
    batches = get_date_batches(start_date, end_date, max_days)
    all_results = []
    
    for batch_start, batch_end in batches:
        batch_filter = query_filter.copy()
        batch_filter["created"] = {"$gte": batch_start, "$lt": batch_end}
        
        try:
            batch_results = power_model.find(batch_filter, sort=[("created", 1)])
            all_results.extend(batch_results)
        except Exception as e:
            print(f"Error querying batch {batch_start} to {batch_end}: {e}")
            continue
    
    return all_results

def calculate_capacity_for_month(start_date, end_date):
    """
    Calculate max and median power for each data hall for a given month.
    
    Max for individual site: 
      - Aggregate all readings within each time segment (10-min window)
      - Find the highest aggregated value for that site
    
    Max for all:
      - For each time segment, sum all sites' readings
      - Find the highest total across all time segments
    
    Median for individual site:
      - Calculate median of all individual readings for that site
    
    Median for all:
      - Calculate median of all readings from all sites combined
    """
    sites = ["odcdh1", "odcdh2", "odcdh3", "odcdh4", "odcdh5"]
    power_model = Power()
    
    result = {
        "month": start_date.strftime("%B %Y"),
        "dh1_max": 0,
        "dh1_median": 0,
        "dh2_max": 0,
        "dh2_median": 0,
        "dh3_max": 0,
        "dh3_median": 0,
        "dh4_max": 0,
        "dh4_median": 0,
        "dh5_max": 0,
        "dh5_median": 0,
        "all_max": 0,
        "all_median": 0
    }
    
    # Get all readings for all sites
    all_site_readings = {}
    all_readings_combined = []  # For "all" median calculation
    
    for site in sites:
        try:
            readings = query_power_in_batches(
                power_model,
                {"site": site},
                start_date,
                end_date,
                max_days=3
            )
            all_site_readings[site] = readings
            print(f"{site}: {len(readings)} readings")
        except Exception as e:
            print(f"Error processing {site}: {e}")
            all_site_readings[site] = []
    
    # Calculate for each individual site
    column_map = {
        "odcdh1": "dh1",
        "odcdh2": "dh2",
        "odcdh3": "dh3",
        "odcdh4": "dh4",
        "odcdh5": "dh5"
    }
    
    # Store aggregated values by timestamp for "all" calculation
    timestamp_totals = {}
    
    for site, readings in all_site_readings.items():
        col = column_map[site]
        
        # Group readings by time segment (10-minute windows) for this site
        site_time_segments = {}
        individual_readings = []
        
        for reading in readings:
            try:
                timestamp = reading.get("created")
                power_value = reading.get("reading", 0)
                location = reading.get("location", "unknown")
                individual_readings.append(power_value)
                all_readings_combined.append(power_value)  # For "all" median
                
                if timestamp:
                    if isinstance(timestamp, str):
                        timestamp = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
                    
                    # Round to nearest 10 minutes
                    rounded_time = timestamp.replace(second=0, microsecond=0)
                    minutes = (rounded_time.minute // 10) * 10
                    timestamp_key = rounded_time.replace(minute=minutes)
                    
                    # Create nested structure: timestamp -> location -> power
                    # This ensures we only take ONE reading per location per time segment
                    if timestamp_key not in site_time_segments:
                        site_time_segments[timestamp_key] = {}
                    
                    # Store by location to avoid duplicates
                    site_time_segments[timestamp_key][location] = power_value
                    
                    # Also track for "all" calculation
                    if timestamp_key not in timestamp_totals:
                        timestamp_totals[timestamp_key] = {}
                    if site not in timestamp_totals[timestamp_key]:
                        timestamp_totals[timestamp_key][site] = {}
                    
                    # Store by location within site
                    timestamp_totals[timestamp_key][site][location] = power_value
            except Exception as e:
                print(f"Error processing reading for {site}: {e}")
                continue
        
        # Calculate max for this site: highest sum within any time segment
        # Sum all locations within each time segment
        try:
            if site_time_segments:
                segment_sums = []
                for timestamp_key, locations_dict in site_time_segments.items():
                    # Sum all unique locations for this time segment
                    segment_sum = sum(locations_dict.values())
                    segment_sums.append(segment_sum)
                
                if segment_sums:
                    result[f"{col}_max"] = max(segment_sums) / 1000  # Convert to kW
                    avg_locations = sum(len(locs) for locs in site_time_segments.values()) / len(site_time_segments)
                    print(f"{site} max: {result[f'{col}_max']:.2f} kW from {len(segment_sums)} time segments, "
                          f"avg {avg_locations:.1f} locations per segment")
        except Exception as e:
            print(f"Error calculating max for {site}: {e}")
        
        # Calculate median for this site: median of all individual readings
        try:
            if individual_readings:
                result[f"{col}_median"] = calculate_median(individual_readings) / 1000  # Convert to kW
                print(f"{site} median: {result[f'{col}_median']:.2f} kW from {len(individual_readings)} readings")
        except Exception as e:
            print(f"Error calculating median for {site}: {e}")
    
    # Calculate "all" max: highest total across all time segments
    try:
        if timestamp_totals:
            all_segment_totals = []
            for timestamp_key, sites_data in timestamp_totals.items():
                # Sum all sites' readings for this time segment
                # Each site_data is a dict of {location: power_value}
                segment_total = 0
                for site, locations_dict in sites_data.items():
                    # Sum all unique locations for this site at this timestamp
                    segment_total += sum(locations_dict.values())
                all_segment_totals.append(segment_total)
            
            if all_segment_totals:
                result["all_max"] = max(all_segment_totals) / 1000  # Convert to kW
                print(f"All sites max: {result['all_max']:.2f} kW from {len(all_segment_totals)} time segments")
    except Exception as e:
        print(f"Error calculating all max: {e}")
    
    # Calculate "all" median: median of all individual readings from all sites
    try:
        if all_readings_combined:
            result["all_median"] = calculate_median(all_readings_combined) / 1000  # Convert to kW
            print(f"All sites median: {result['all_median']:.2f} kW from {len(all_readings_combined)} readings")
    except Exception as e:
        print(f"Error calculating all median: {e}")
    
    return result

def auto_save_previous_month():
    """Automatically save previous month's capacity data if not already saved"""
    try:
        current_date = datetime.now()
        first_day_current = datetime(current_date.year, current_date.month, 1)
        first_day_previous = first_day_current - relativedelta(months=1)
        
        previous_month = first_day_previous.strftime("%B %Y")
        
        # Load existing data
        existing_data = load_capacity_data()
        
        # Check if previous month data already exists
        existing_months = [item.get('month') for item in existing_data]
        if previous_month in existing_months:
            print(f"Capacity data for {previous_month} already exists")
            return
        
        print(f"Auto-saving capacity data for {previous_month}")
        
        # Calculate capacity data for previous month
        capacity_data = calculate_capacity_for_month(first_day_previous, first_day_current)
        capacity_data["auto_saved"] = True
        capacity_data["saved_date"] = datetime.now().isoformat()
        
        # Add to existing data and save
        existing_data.append(capacity_data)
        save_capacity_data(existing_data)
        print(f"Successfully auto-saved capacity data for {previous_month}")
        
    except Exception as e:
        print(f"Error in auto-save previous month capacity: {e}")

@power_capacity.route("", methods=["GET"])
def get_capacity_data():
    """Get power capacity data from JSON file"""
    try:
        # Auto-save previous month if needed
        auto_save_previous_month()
        
        data = load_capacity_data()
        return jsonify(data)
    except Exception as e:
        return {"status": "error", "data": str(e)}

@power_capacity.route("/current-previous", methods=["GET"])
def get_current_previous():
    """Get current and previous month capacity data"""
    try:
        # Auto-save previous month if needed
        auto_save_previous_month()
        
        current_date = datetime.now()
        first_day_current = datetime(current_date.year, current_date.month, 1)
        first_day_previous = first_day_current - relativedelta(months=1)
        
        current_month = current_date.strftime("%B %Y")
        previous_month = first_day_previous.strftime("%B %Y")
        
        # Load existing data
        existing_data = load_capacity_data()
        
        # Check if current month data exists in saved data
        current_data = next((item for item in existing_data if item['month'] == current_month), None)
        
        # If not, calculate it live
        if not current_data:
            print(f"Calculating live capacity data for {current_month}")
            current_data = calculate_capacity_for_month(first_day_current, current_date)
        
        # Get previous month data from saved data
        previous_data = next((item for item in existing_data if item['month'] == previous_month), None)
        
        return jsonify({
            "current": current_data,
            "previous": previous_data
        })
        
    except Exception as e:
        print(f"Error getting current/previous capacity: {e}")
        return {"status": "error", "message": str(e)}, 500

@power_capacity.route("/auto-save", methods=["POST"])
def trigger_auto_save():
    """Manually trigger auto-save for previous month (for testing)"""
    try:
        auto_save_previous_month()
        return {"status": "success", "message": "Auto-save completed"}
    except Exception as e:
        return {"status": "error", "data": str(e)}