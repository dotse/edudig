from parser import basic_info, question_section


def parse(dig_output: str) -> dict:
    answer = dig_output.split(sep="\n\n")
    parsed_output = {}

    parsed_output["basic_info"] = basic_info.parse(answer[0])

    question_index = answer[1].find(";; QUESTION SECTION:")
    parsed_output["question_section"] = question_section.parse(answer[1][question_index:])

    return parsed_output
