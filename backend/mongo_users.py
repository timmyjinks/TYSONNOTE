import pymongo
from bson import ObjectId

client = pymongo.MongoClient("mongodb://root:password@localhost:27017/")

db = client["users"]
notes_col = db["user_info"]


def insert_one(user_name, password):
    user_data = {"user_name": user_name, "password": password}
    result = notes_col.insert_one(user_data)
    return result.inserted_id


def find_user(user_name, password):
    query = {"user_name": user_name, "password": password}
    result = notes_col.find_one(query)
    return result
