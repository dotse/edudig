from parser import basic_info


def parse(dig_output: str) -> dict:
    answer = dig_output.split(sep="\n\n")
    return basic_info.parse(answer[0])
    parsed_output = {}
    parsed_output["basic_info"] = basic_info.parse(answer[0])

    return parsed_output
