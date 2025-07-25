from flask import Flask
from routes.power import power
from routes.temperature import temperature
from routes.dashboard import dashboard
from routes.systems import systems
from flask_cors import CORS

app = Flask(__name__)
CORS(
    app,
    origins="*",
)

app.register_blueprint(power, url_prefix="/power")
app.register_blueprint(temperature, url_prefix="/temperature")
app.register_blueprint(dashboard, url_prefix="/dashboard")
app.register_blueprint(systems, url_prefix="/systems")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
