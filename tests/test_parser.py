from pprint import pprint
from parser.basic_info import parse


def test_basic_info():
    input = """; <<>> DiG 9.10.6 <<>> iis.se a
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 61611
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1
"""

    output = parse(input)
    assert 5 == len(output["parts"])
    assert output == {
        "desc": "basic info is bla bla",
        "parts": [
            {
                "desc": "The version of dig and the query sent",
                "parts": [
                    {"desc": "This is the version of Dig used.", "text": "9.10.6"},
                    {"desc": "This is the query that was sent.", "text": "iis.se"},
                ],
                "text": "<<>> DiG $0 <<>> $1",
            },
            {
                "desc": "The global options set.",
                "parts": [{"desc": "global options that were set.", "text": "+cmd"}],
                "text": "Global Options",
            },
            {
                "desc": "Is this every anything else??.",
                "parts": [{"desc": "No idea what this is actually.", "text": ""}],
                "text": "Got answer",
            },
            {
                "desc": "Header row including opcode, response code and message " "id.",
                "parts": [
                    {"desc": "Opcode Query.", "text": "QUERY"},
                    {"desc": "Status Code.", "text": "NOERROR"},
                    {"desc": "The message id.", "text": "61611"},
                ],
                "text": "->>HEADER<<- opcode: $0, status: $1, id: $2",
            },
            {
                "desc": "Flags and section count.",
                "parts": [
                    {"desc": "DNS Header Flags", "text": "qr rd ra"},
                    {"desc": "Number of queries", "text": "1"},
                    {"desc": "Number in the ANSWER section", "text": "1"},
                    {"desc": "Number in the AUTHORITY section", "text": "0"},
                    {"desc": "Number in the ADDITIONAL section", "text": "1"},
                ],
                "text": ";; flags: $0; QUERY: $1, ANSWER: $2, AUTHORITY: $3, "
                "ADDITIONAL: $4",
            },
        ],
        "text": "",
    }
