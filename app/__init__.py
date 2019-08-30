import os
import subprocess
import re

from flask import Flask, send_from_directory
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

example_response = {
    "text": "",
    "desc": "The complete dig stuff",
    "parts": [
        {
            "text": "; <<>> DiG $0 <<>> $1",
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
        result = subprocess.run(["dig", "iis.se"], stdout=subprocess.PIPE)
        answer = result.stdout.decode().split(sep="\n\n")
        return self.parse_basic_info(answer[0])
        self.parse_opt_section(answer[1])
        self.parse_answer_section(answer[2])
        self.parse_summary_info(answer[3])

    def parse_basic_info(self, info: str):

        basic_info = {
            "text": "",  # TODO add text with placeholders
            "desc": "basic info is bla bla",
            "parts": [],
        }

        for row in info.split(sep="\n"):
            if "DiG" in row:
                part = {
                    "text": "",  # TODO add text with placeholders
                    "desc": "the version dig and query sent",
                    "parts": [],
                }
                print(row)
                match_object = re.match(
                    re.compile(r"; <<>> DiG (.+) <<>> ([\w.]+)"), row
                )
                if match_object:
                    part["parts"].append(
                        {
                            "text": match_object.group(1),
                            "desc": "This is the version of Dig used.",
                        }
                    )
                    part["parts"].append(
                        {
                            "text": match_object.group(2),
                            "desc": "This is the query that was sent.",
                        }
                    )
                    basic_info["parts"].append(part)
        return basic_info

    def parse_opt_section(self, opt: str):
        pass

    def parse_answer_section(self, answer: str):
        pass

    def parse_summary_info(self, summary: str):
        pass


@app.route("/")
def home():
    return app.send_static_file("index.html")


api.add_resource(DiG, "/api")

if __name__ == "__main__":
    app.run(debug=True)
