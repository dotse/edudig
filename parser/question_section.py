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
    section["parts"].append(_class(parts[1]))

    return section


def _domain_name(value: str):
    value = value.strip(";")
    part = {
        "text": value,
        "desc": "This is the domain name that is queried."
    }
    return part


def _class(value: str):
    part = {
        "text": value.upper(),
        "desc": f"This is the data class that is queried: {value.upper()}\n"
    }

    classes = {
        "IN": "IN stands for Internet, it is the default class used for most DNS queries.",
        "CH": "CH stands for Chaos, it is commonly used for things like querying DNS server versions.",
    }

    try:
        part["desc"] += classes[value.upper()]
    except KeyError:
        part["desc"] += "Could not find class description."

    return part

