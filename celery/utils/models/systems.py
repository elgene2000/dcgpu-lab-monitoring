from utils.factory.validation import Validator
from utils.factory.database import Database


class Systems(object):
    def __init__(self):
        self.validator = Validator()
        self.db = Database()

        self.collection_name = "systems"  # collection name

        self.fields = {
            "system": "string",
            "site": "string",
            "location": "string",
            "created": "datetime",
            "updated": "datetime",
        }

        self.create_required_fields = ["system", "created", "updated"]

        # Fields optional for CREATE
        self.create_optional_fields = [
            "site",
            "location",
        ]

        # Fields required for UPDATE
        self.update_required_fields = []

        # Fields optional for UPDATE
        self.update_optional_fields = [
            "system",
            "site",
            "location",
        ]

    def create(self, system_data):
        # Validator will throw error if invalid
        self.validator.validate(
            system_data,
            self.fields,
            self.create_required_fields,
            self.create_optional_fields,
        )
        res = self.db.insert(system_data, self.collection_name)
        return "Inserted Id " + res

    def find(self, system_data):  # find all
        return self.db.find(system_data, self.collection_name)

    def find_by_id(self, id):
        return self.db.find_by_id(id, self.collection_name)

    def update(self, id, system_data):
        self.validator.validate(
            system_data,
            self.fields,
            self.update_required_fields,
            self.update_optional_fields,
        )
        return self.db.update(id, system_data, self.collection_name)

    def delete(self, id):
        return self.db.delete(id, self.collection_name)