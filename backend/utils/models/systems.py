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

        self.create_required_fields = ["system", "site", "location"]

        self.create_optional_fields = ["created", "updated"]

        self.update_required_fields = []

        self.update_optional_fields = ["system", "site", "location"]

    def create(self, data):
        self.validator.validate(
            data,
            self.fields,
            self.create_required_fields,
            self.create_optional_fields,
        )
        res = self.db.insert(data, self.collection_name)
        return "Inserted Id " + res

    def find(self, data, sort=None, limit=0):
        return self.db.find(data, self.collection_name, sort=sort, limit=limit)

    def find_by_id(self, id):
        return self.db.find_by_id(id, self.collection_name)

    def update(self, id, data):
        self.validator.validate(
            data,
            self.fields,
            self.update_required_fields,
            self.update_optional_fields,
        )
        return self.db.update(id, data, self.collection_name)

    def delete(self, id):
        return self.db.delete(id, self.collection_name) 