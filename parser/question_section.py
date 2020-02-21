import re


def parse(question: str):
    section = {
        "text": ";; QUESTION SECTION:\n"
                ";$0\t$1\t$2\n",
        "desc": "The question section contains bla bla",
        "parts": []
    }

    # Split on newline and get second line, then go through every part (word) in that line
    parts = question.splitlines()[1].split()

    section["parts"].append(_domain_name(parts[0]))
    return section


def _domain_name(value: str):
    value = value.strip(";")
    part = {
        "text": value,
        "desc": "This is the domain name that is queried."
    }
    return part

