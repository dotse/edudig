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

    return section
