import argparse
import json
import sys
import urllib.request

from bs4 import BeautifulSoup


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("url", help="an URL of a CNAM training")
    parser.add_argument(
        "outfile", nargs="?", help="write the output to outfile", default=None
    )
    options = parser.parse_args()

    with urllib.request.urlopen(options.url) as response:
        if options.outfile is None:
            outfile = sys.stdout
        else:
            outfile = open(options.outfile, "w", encoding="utf-8")
        with outfile:
            soup = BeautifulSoup(response, "html.parser")
            for blocks in soup.find_all("div", {"class": "suite-inner"}):
                try:
                    codes = ", ".join([f"_.{code.string}" for code in blocks.find_all("div", {"class": "code"})])
                    out = "{\"ects\": null, \"units\": [%s], \"required_children\": 0, \"children\": []},\n" % codes
                    outfile.write(out)
                except:
                    pass


if __name__ == "__main__":
    main()
