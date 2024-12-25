# mongo driver
import pymongo
from bson import ObjectId

# CRUD
client = pymongo.MongoClient("mongodb://root:password@localhost:27017/")
db = client["user_notes"]
notes_col = db["notes"]


def insert_one(user_name: str, notes: str):
    notes_data = {"user_name": user_name, "note": notes}
    result = notes_col.insert_one(notes_data)
    return result.inserted_id


# def insert_many(user_name: str, notes: str):
#     notes_data = {"user_name": user_name, "notes": notes}
#     result = notes_col.insert_one(notes_data)
#     result.inserted_id


def find_one(id: str):
    query = {"__id": ObjectId(id)}
    data = notes_col.find_one(query)
    return data


def find_all():
    data = notes_col.find()
    return data


def find_note_id(user_name: str, note: str):
    query = {"user_name": user_name, "note": note}
    data = notes_col.find_one(query, {"__id": 1})
    return data


def find_all_by_user(user_name: str):
    query = {"user_name": user_name}
    data = notes_col.find(query, {"_id": 0, "user_name": 0})
    return data.to_list()


def update_one(id: str, notes_new: str):
    query = {"__id": ObjectId(id)}
    data_new = {"__id": ObjectId(id), "note": notes_new}

    result = notes_col.update_one(query, data_new)
    return result.modified_count


def delete_one(id: str):
    query = {"__id": ObjectId(id)}
    result = notes_col.delete_one(query)
    return result.deleted_count


# def delete_many(user_name: str, notes: str):
#     notes_data = {"user_name": user_name, "notes": notes}
#     result = notes_col.insert_one(notes_data)
#     result.inserted_id
