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
    text = pyimagesearch.image_to_string(image).strip()
    inserted_id = dal.insert_one("user_name", text)
    print(inserted_id)
    return "text"


@app.route("/notes/<user_name>", methods=["GET"])
def get_notes(user_name):
    print(user_name)
    result = dal.find_all_by_user(user_name)
    return jsonify(result)
