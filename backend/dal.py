# mongo driver
import pymongo
from bson import ObjectId

client = pymongo.MongoClient("mongodb://root:password@mongo:27017/")
db = client["user_notes"]
notes_col = db["notes"]


def insert_one(user_name: str, notes: str):
    notes_data = {"user_name": user_name, "note": notes}
    result = notes_col.insert_one(notes_data)
    return result.inserted_id


def find_one(id: str):
    query = {"_id": ObjectId(id)}
    data = notes_col.find_one(query)
    return data


def find_all():
    data = notes_col.find()
    return data


def find_all_by_user(user_name: str):
    query = {"user_name": user_name}
    data = notes_col.find(query)
    data_new = []
    for x in data:
        data_new.append(
            {"_id": str(x["_id"]), "user_name": x["user_name"], "note": x["note"]}
        )

    return data_new


def update_one(id: str, notes_new: str):
    query = {"_id": ObjectId(id)}
    data_new = {"$set": {"note": notes_new}}
    result = notes_col.update_one(query, data_new)
    return result.modified_count


def delete_one(id: str):
    query = {"_id": ObjectId(id)}
    result = notes_col.delete_one(query)
    return result.deleted_count
