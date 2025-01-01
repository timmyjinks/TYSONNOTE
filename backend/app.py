from io import BytesIO

from flask import Flask, jsonify, request, send_file
from flask_cors import CORS

import mongo_notes as note_dal
import mongo_users as user_dal
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
    inserted_id = note_dal.insert_one(user_name, text)
    print(inserted_id)
    return "200 YG2G"


@app.route("/notes/<user_name>", methods=["GET"])
def get_notes(user_name):
    result = note_dal.find_all_by_user(user_name)
    return jsonify(result)


@app.route("/update_notes", methods=["POST"])
def edit_notes():
    id = request.get_json()["_id"]
    new_note = request.get_json()["new_note"]
    result = note_dal.update_one(id, new_note)
    print(result)
    return "200 YG2G"


@app.route("/delete_notes", methods=["POST"])
def delete_notes():
    id = request.get_json()["_id"]
    result = note_dal.delete_one(id)
    print(result)
    return "200 YG2G"


@app.route("/login", methods=["POST"])
def login():
    user_name = request.get_json()["user_name"]
    password = request.get_json()["password"]
    isValid = False

    user = user_dal.find_user(user_name, password)

    if user != None:
        isValid = True

    return jsonify({"isValid": isValid})


@app.route("/sign_up", methods=["POST"])
def sign_up():
    user_name = request.get_json()["user_name"]
    password = request.get_json()["password"]
    isValid = False

    user = user_dal.find_user(user_name, password)

    if user == None:
        isValid = True
        id = user_dal.insert_one(user_name, password)
        return jsonify({"isValid": isValid})

    return jsonify({"isValid": isValid})


@app.route("/get_note", methods=["POST"])
def get_note():
    image = request.files["image"].stream.read()
    text = pyimagesearch.image_to_string(image).strip()
    data = BytesIO()
    data.write(str.encode(text))
    data.seek(0)
    return send_file(
        data, mimetype="text/plain", as_attachment=True, download_name="note.txt"
    )


@app.route("/get_note", methods=["GET"])
def getget_note():
    text = "test"
    data = BytesIO()
    data.write(str.encode(text))
    data.seek(0)
    return send_file(
        data, mimetype="text/plain", as_attachment=True, download_name="note.txt"
    )
