from flask import Flask
from routes.dashboard import dashboard
from routes.power import power
from routes.temp import temp_sensor
from routes.ssb import ssb
from flask_cors import CORS

app = Flask(__name__)
CORS(
    app,
    origins="*",
)

app.register_blueprint(power, url_prefix="/power")
# app.register_blueprint(dashboard, url_prefix="/dashboard")
# app.register_blueprint(temp_sensor, url_prefix="/temp")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
