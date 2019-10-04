import re


def parse(info: str):
    basic_info = {
        "text": "",  # TODO add text with placeholders
        "desc": "basic info is bla bla",
        "parts": [],
    }

    for row in info.split(sep="\n"):

        if "DiG" in row:
            basic_info["parts"].append(_command(row))

        elif "global options" in row:
            basic_info["parts"].append(_global_options(row))

        elif "Got answer" in row:
            basic_info["parts"].append(_got_answer(row))

        elif "HEADER" in row:
            basic_info["parts"].append(_header(row))

        elif "flags" in row:
            basic_info["parts"].append(_flags(row))

    return basic_info


def _command(row: str) -> dict:
    print(row)
    part = {
        "text": "<<>> DiG $0 <<>> $1",  # TODO add text with placeholders
        "desc": "The version of dig and the query sent",
        "parts": [],
    }
    print(row)
    match_object = re.match(re.compile(r"; <<>> DiG (.+) <<>> ([\w.]+)"), row)
    assert match_object

    part["parts"].append(
        {"text": match_object.group(1), "desc": "This is the version of Dig used."}
    )
    part["parts"].append(
        {"text": match_object.group(2), "desc": "This is the query that was sent."}
    )
    return part


def _global_options(row: str) -> dict:
    part = {
        "text": "Global Options",  # TODO add text with placeholders
        "desc": "The global options set.",
        "parts": [],
    }
    print(row)
    # TODO check if there are other global options and handle them
    match_object = re.match(re.compile(r";; global options: (\+\w+)\s*"), row)
    assert match_object

    part["parts"].append(
        {"text": match_object.group(1), "desc": "global options that were set."}
    )
    return part


def _got_answer(row: str) -> dict:
    part = {
        "text": "Got answer",  # TODO add text with placeholders
        "desc": "Is this every anything else??.",
        "parts": [],
    }
    print(row)
    # TODO check if there are other global options and handle them
    match_object = re.match(re.compile(r";; Got answer:\s*(.*)\s*"), row)
    assert match_object

    part["parts"].append(
        {"text": match_object.group(1), "desc": "No idea what this is actually."}
    )
    return part


def _header(row: str) -> dict:
    part = {
        "text": "->>HEADER<<- opcode: $0, status: $1, id: $2",  # TODO add text with placeholders
        "desc": "Header row including opcode, response code and message id.",
        "parts": [],
    }
    print(row)
    match_object = re.match(
        re.compile(r";; ->>HEADER<<- opcode: (\w*), status: (\w*), id: (\d*)"), row
    )
    assert match_object

    part["parts"].append(
        {
            "text": match_object.group(1),
            "desc": "Opcode Query.",  # TODO research if Opcode is always a query
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
    part["parts"].append({"text": match_object.group(3), "desc": "The message id."})
    return part


def _flags(row: str) -> dict:
    part = {
        "text": ";; flags: $0; QUERY: $1, ANSWER: $2, AUTHORITY: $3, ADDITIONAL: $4",
        # TODO add text with placeholders
        "desc": "Flags and section count.",
        "parts": [],
    }
    print(row)
    match_object = re.match(
        re.compile(
            r";; flags: (\w.*); QUERY: (\d*), ANSWER: (\d*), AUTHORITY: (\d*), ADDITIONAL: (\d*)"
        ),
        row,
    )
    assert match_object
    part["parts"].append(
        {
            "text": match_object.group(1),
            "desc": "DNS Header Flags",  # TODO parse flags and create descriptions
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
        {"text": match_object.group(3), "desc": "Number in the ANSWER section"}
    )
    part["parts"].append(
        {"text": match_object.group(4), "desc": "Number in the AUTHORITY section"}
    )
    part["parts"].append(
        {"text": match_object.group(5), "desc": "Number in the ADDITIONAL section"}
    )
    return part
