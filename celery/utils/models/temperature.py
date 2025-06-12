from utils.factory.validation import Validator
from utils.factory.database import Database


class Temperature(object):
    def __init__(self):
        self.validator = Validator()

        self.db = Database()

        self.collection_name = "temperature"  # collection name

        self.fields = {
            "site": "string",
            "location": "string",
            "pdu_hostname": "string",
            "reading": "float",
            "symbol": "string",
            "created": "datetime",
            "updated": "datetime",
        }

        self.create_required_fields = ["reading"]

        # Fields optional for CREATE
        self.create_optional_fields = [
            "site",
            "location",
            "pdu_hostname",
            "symbol",
            "created",
            "updated",
        ]
        
        # Fields required for UPDATE
        self.update_required_fields = []

        # Fields optional for UPDATE
        self.update_optional_fields = []

    def create(self, temperature_data):
        # Validator will throw error if invalid
        self.validator.validate(
            temperature_data,
            self.fields,
            self.create_required_fields,
            self.create_optional_fields,
        )
        res = self.db.insert(temperature_data, self.collection_name)
        return "Inserted Id " + res

    def find(self, temperature_data):  # find all
        return self.db.find(temperature_data, self.collection_name)

    def find_by_id(self, id):
        return self.db.find_by_id(id, self.collection_name)

    def update(self, id, temperature_data):
        self.validator.validate(
            temperature_data,
            self.fields,
            self.update_required_fields,
            self.update_optional_fields,
        )
        return self.db.update(id, temperature_data, self.collection_name)

    def delete(self, id):
        return self.db.delete(id, self.collection_name)
