import re


def parse(question: str):
    section = {
        "text": ";; QUESTION SECTION:\n"
                ";$0\t$1\t$2\n",
        "desc": "The question section contains the question as it was asked by Dig",
        "parts": []
    }

    # Split on newline and get second line, then go through every part (word) in that line
    parts = question.splitlines()[1].split()

    section["parts"].append(_domain_name(parts[0]))
    section["parts"].append(_class(parts[1]))
    section["parts"].append(_type(parts[2]))

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


def _type(value: str):
    part = {
        "text": value.upper(),
        "desc": f"This is the data type that is queried: {value.upper()}\n"
    }

    types = {
        "A": "IPv4 address record, commonly used to map hostnames to an address",

        "AAAA": "IPv6 address record, commonly used to map hostnames to an address",

        "DNSKEY": "DNS Key record, it is used in DNSSEC to sign data",

        "NS": "Name server record, used to delegate a zone to use the given authoritative name servers",

        "RRSIG": "DNSSEC signature, signature for a DNSSEC-secured record set.",

        "SOA": "Start of authority record, Specifies authoritative information about a DNS zone, "
               "including the primary name server, the email of the domain administrator, the domain serial number, "
               "and several timers relating to refreshing the zone.",

        "TXT": "Text record, Originally for arbitrary human-readable text in a DNS record, however, "
               "this record more often carries machine-readable data,"
    }

    try:
        part["desc"] += types[value.upper()]
    except KeyError:
        part["desc"] += "Could not find type description."

    return part
