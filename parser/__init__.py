from parser import basic_info, opt_section


def parse(dig_output: str) -> dict:
    answer = dig_output.split(sep="\n\n")
    # bob = basic_info.parse(answer[0])
    alice = opt_section.parse(answer[1])
    return alice
