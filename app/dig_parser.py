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
        result = subprocess.run(["dig", "internetstiftelsen.se"], stdout=subprocess.PIPE)
        answer = result.stdout.decode().split(sep="\n\n")
        basic_info = self.parse_basic_info(answer[0])
        return basic_info
        # return self.parse_basic_info(answer[0])
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
                print(row)
                part = {
                    "text": "<<>> DiG $0 <<>> $1",  # TODO add text with placeholders
                    "desc": "The version of dig and the query sent",
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
            elif "global options" in row:
                part = {
                    "text": "Global Options",  # TODO add text with placeholders
                    "desc": "The global options set.",
                    "parts": [],
                }
                print(row)
                match_object = re.match(
                    re.compile(r";; global options: (\+\w+)\s*"), row
                    # TODO check if there are other global options and handle them
                )
                if match_object:
                    part["parts"].append(
                        {
                            "text": match_object.group(1),
                            "desc": "global options that were set.",
                        }
                    )
                    basic_info["parts"].append(part)
            elif "Got answer" in row:
                part = {
                    "text": "Got answer",  # TODO add text with placeholders
                    "desc": "Is this every anything else??.",
                    "parts": [],
                }
                print(row)
                match_object = re.match(
                    re.compile(r";; Got answer:\s*(.*)\s*"), row
                    # TODO check if there are other global options and handle them
                )
                if match_object:
                    part["parts"].append(
                        {
                            "text": match_object.group(1),
                            "desc": "No idea what this is actually.",
                        }
                    )
                    basic_info["parts"].append(part)
            elif "HEADER" in row:
                part = {
                    "text": "->>HEADER<<- opcode: $0, status: $1, id: $2",  # TODO add text with placeholders
                    "desc": "Header row including opcode, response code and message id.",
                    "parts": [],
                }
                print(row)
                match_object = re.match(
                    re.compile(r";; ->>HEADER<<- opcode: (\w*), status: (\w*), id: (\d*)"), row
                )
                if match_object:
                    part["parts"].append(
                        {
                            "text": match_object.group(1),
                            "desc": "Opcode Query.", # TODO research if Opcode is always a query
                        }
                    )
                    part["parts"].append(
                        {
                            "text": match_object.group(2),
                            "desc": "Status Code.",
                            # TODO write code to handle descriptions for the
                            #  possible status codes
                            #  RCODE https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-6
                        }
                    )
                    part["parts"].append(
                        {
                            "text": match_object.group(3),
                            "desc": "The message id.",
                        }
                    )
                    basic_info["parts"].append(part)
            elif "flags" in row:
                part = {
                    "text": ";; flags: $0; QUERY: $1, ANSWER: $2, AUTHORITY: $3, ADDITIONAL: $4",  # TODO add text with placeholders
                    "desc": "Flags and section count.",
                    "parts": [],
                }
                print(row)
                match_object = re.match(
                    re.compile(r";; flags: (\w.*); QUERY: (\d*), ANSWER: (\d*), AUTHORITY: (\d*), ADDITIONAL: (\d*)"), row
                )
                if match_object:
                    part["parts"].append(
                        {
                            "text": match_object.group(1),
                            "desc": "DNS Header Flags", # TODO parse flags and create descriptions
                        }
                    )
                    part["parts"].append(
                        {
                            "text": match_object.group(2),
                            "desc": "Number of queries",
                            # TODO check if this is ever more than 1
                        }
                    )
                    part["parts"].append(
                        {
                            "text": match_object.group(3),
                            "desc": "Number in the ANSWER section",
                        }
                    )
                    part["parts"].append(
                        {
                            "text": match_object.group(4),
                            "desc": "Number in the AUTHORITY section",
                        }
                    )
                    part["parts"].append(
                        {
                            "text": match_object.group(5),
                            "desc": "Number in the ADDITIONAL section",
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
    app.run(debug=True, host='0.0.0.0')