from flask import Flask, request
from flask_cors import CORS

import pyimagesearch

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET", "POST"])
def fuck():
    if request.method == "GET":
        return "GET"
    else:
        image = request.files["file"].stream.read()
        text = pyimagesearch.image_to_string(image)
        print(text)
        return "POST"
