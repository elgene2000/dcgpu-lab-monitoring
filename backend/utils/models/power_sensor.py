from utils.factory.validation import Validator
from utils.factory.database import Database

class PowerSensor(object):
    def __init__(self):
        self.validator = Validator()
        self.db = Database()

        self.collection_name = 'power_sensor'  # collection name

        self.fields = {
            "sensor_id": "string",
            "pdu_ip": "string",
            "reading": "float",
            "created": "datetime",
            "updated": "datetime",
        }

        self.create_required_fields = ["reading"]

        # Fields optional for CREATE
        self.create_optional_fields = ["sensor_id", "pdu_ip"]

        # Fields required for UPDATE
        self.update_required_fields = []

        # Fields optional for UPDATE
        self.update_optional_fields = []

    def create(self, power_sensor_data):
        # Validator will throw error if invalid
        self.validator.validate(power_sensor_data, self.fields, self.create_required_fields, self.create_optional_fields)
        res = self.db.insert(power_sensor_data, self.collection_name)
        return "Inserted Id " + res

    def find(self, power_sensor_data, sort=None, limit=0):  # find all
        return self.db.find(power_sensor_data, self.collection_name, sort=sort, limit=limit)

    def find_by_id(self, id):
        return self.db.find_by_id(id, self.collection_name)

    def update(self, id, power_sensor_data):
        self.validator.validate(power_sensor_data, self.fields, self.update_required_fields, self.update_optional_fields)
        return self.db.update(id, power_sensor_data,self.collection_name)

    def delete(self, id):
        return self.db.delete(id, self.collection_name)