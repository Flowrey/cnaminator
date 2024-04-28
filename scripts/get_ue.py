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
            for ue in soup.find_all("div", {"class": "details clearfix"}):
                try:
                    titre = ue.find("h4", {"class": "titre"}).string
                    code = ue.find("div", {"class": "code"}).string
                    credits = int(ue.find("div", {"class": "credits"}).string.split(" ")[0])
                    outfile.write(
                        f"export const {code} = {json.dumps({"code": code, "title": titre, "ects": credits}, ensure_ascii=False)}\n"
                    )
                except:
                    pass


if __name__ == "__main__":
    main()
