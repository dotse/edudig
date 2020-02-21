import re

def parse(opt: str):
    opt_section = {
        "text": ";; OPT PSEUDOSECTION:",
        "desc": "OPT PSEUDOSECTION is part of the ADDITIONAL ",
        "parts": [],
    }

    for row in opt.split(sep="\n"):
        print(row)
        if "EDNS" in row:
            opt_section["parts"].append(_edns(row))

    return opt_section


def _edns(row: str) -> dict:
    print(row)
    part = {
        "text": "EDNS: version: $0, flags:; udp: $1",
        "desc": "The EDNS version and UDP buffer size",
        "parts": [],
    }
    print(row)
    match_object = re.match(re.compile(r"; EDNS: version: (\d), flags:; udp: ([\d.]+)"), row)
    assert match_object

    part["parts"].append(
        {"text": match_object.group(1), "desc": "This is the EDNS version ."}
    )
    part["parts"].append(
        {"text": match_object.group(2), "desc": "This is UDP buffer size"}
    )
    return part