import os
import subprocess

from flask import Flask, send_from_directory
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

example_response = {
    "text": "",
    "desc": "The complete dig stuff",
    "parts": [
        {
            "text": "; <<>> DiG ",
            "desc": "This is some basic info",
            "parts": [
                {"text": "9.14.4", "desc": "This is the version of Dig used"},
                {"text": "iis.se", "desc": "The domain you queried"},
            ],
        },
        {
            "text": ";; global options: ",
            "desc": "Bla bla options are something",
            "parts": [
                {"text": "+cmd", "desc": "Bla bla"},
                {"text": "+foo", "desc": "This is foo", "in_response": False},
            ],
        },
    ],
}


class DiG(Resource):
    def get(self):
        result = subprocess.run(["dig", "example.se"], stdout=subprocess.PIPE)
        return str(result.stdout)


@app.route("/")
def home():
    return app.send_static_file("index.html")


api.add_resource(DiG, "/api")

if __name__ == "__main__":
    app.run(debug=True)
