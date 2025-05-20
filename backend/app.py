from flask import Flask
from routes.dashboard import dashboard
from routes.power import power_sensor
from routes.temp import temp_sensor
from routes.ssb import ssb
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*")

app.register_blueprint(dashboard, url_prefix="/api/dashboard")
app.register_blueprint(power_sensor, url_prefix="/api/power")
app.register_blueprint(ssb, url_prefix="/api/ssb")
app.register_blueprint(temp_sensor, url_prefix="/api/temp")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5005, debug=True)