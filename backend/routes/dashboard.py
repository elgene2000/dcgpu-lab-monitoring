# from flask import Blueprint, request
# from utils.models.temp_sensor import TempSensor
# from utils.models.ssb import SSB
# dashboard = Blueprint("dashboard", __name__)

# @dashboard.route("current_read", methods=["GET"])
# def get_current_read():
#     try:
#         res = {}
#         temp_sensor = TempSensor()
#         ssb = SSB()

#         sensor_names = [
#             "Sensor0013",
#             "Sensor0111",
#             "Sensor0019",
#             "Sensor0114",
#             "Sensor0118",
#         ]

#         current_ssb = ssb.find({}, sort=[("created", -1)], limit=1)
#         if current_ssb:
#             res["power"] = {
#                 "reading": current_ssb[0]["reading"],
#                 "created": current_ssb[0]["created"],
#                 "symbol": current_ssb[0]["symbol"]
#             }

#         for sensor_name in sensor_names:
#             current_temp = temp_sensor.find(
#                 {"sensor_id": sensor_name}, sort=[("created", -1)], limit=1
#             )

#             if current_temp:
#                 res[sensor_name] = {
#                     "reading": current_temp[0]["reading"],
#                     "created": current_temp[0]["created"],
#                     "symbol": current_temp[0]["symbol"],
#                 }
#         return {"status": "success", "data": res}
#     except Exception as e:
#         return {"status": "error", "data": str(e)}
