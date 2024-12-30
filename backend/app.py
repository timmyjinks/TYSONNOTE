from flask import Flask, jsonify, request
from flask_cors import CORS

import dal
import pyimagesearch

app = Flask(__name__)
CORS(app)


@app.route("/insert_notes", methods=["POST"])
def insert_notes():
    user_name = request.form.get("user_name")
    image = request.files["image"].stream.read()

    if user_name == None:
        return "Invalid username"

    text = pyimagesearch.image_to_string(image).strip()
    inserted_id = dal.insert_one(user_name, text)
    print(inserted_id)
    return "200 YG2G"


@app.route("/notes/<user_name>", methods=["GET"])
def get_notes(user_name):
    result = dal.find_all_by_user(user_name)
    return jsonify(result)


@app.route("/update_notes", methods=["POST"])
def edit_notes():
    id = request.get_json()["_id"]
    new_note = request.get_json()["new_note"]
    print(id)
    result = dal.update_one(id, new_note)
    return "200 YG2G"


@app.route("/delete_notes", methods=["POST"])
def delete_notes():
    id = request.get_json()["_id"]
    result = dal.delete_one(id)
    return "200 YG2G"
