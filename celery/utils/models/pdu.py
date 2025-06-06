from utils.factory.validation import Validator
from utils.factory.database import Database


class PDU(object):
    def __init__(self):
        self.validator = Validator()

        self.db = Database()

        self.collection_name = "pdu"  # collection name

        self.fields = {
            "hostname": "string",
            "output_power_total_oid": "string",
            "temp_oids": "list",
            "v2c": "string",
            "site": "string",
            "location": "string",
            "created": "datetime",
            "updated": "datetime",
        }

        self.create_required_fields = [
            "hostname",
            "output_power_total_oid",
            "v2c",
            "site",
            "location",
            "created",
            "updated",
        ]

        # Fields optional for CREATE
        self.create_optional_fields = ["temp_oids"]

        # Fields required for UPDATE
        self.update_required_fields = []

        # Fields optional for UPDATE
        self.update_optional_fields = []

    def create(self, pdu_data):
        # Validator will throw error if invalid
        print("validating")
        self.validator.validate(
            pdu_data,
            self.fields,
            self.create_required_fields,
            self.create_optional_fields,
        )
        print("validating done")
        res = self.db.insert(pdu_data, self.collection_name)
        return "Inserted Id " + res

    def find(self, pdu_data):  # find all
        return self.db.find(pdu_data, self.collection_name)

    def find_by_id(self, id):
        return self.db.find_by_id(id, self.collection_name)

    def update(self, id, temp_sensor_data):
        self.validator.validate(
            temp_sensor_data,
            self.fields,
            self.update_required_fields,
            self.update_optional_fields,
        )
        return self.db.update(id, temp_sensor_data, self.collection_name)

    def delete(self, id):
        return self.db.delete(id, self.collection_name)
