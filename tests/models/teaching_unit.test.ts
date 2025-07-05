import { TeachingUnit } from "domain/models/teaching_unit";

export function newHTMLTeachingUnit(
  title?: string,
  code?: string,
  ects?: number,
  teachingCenters: string[] = ["Paris"],
) {
  const teachingUnitDiv = document.createElement("div");
  teachingUnitDiv.setAttribute("class", "ue option clearfix");

  const teachingUnitInfoDiv = document.createElement("div");
  teachingUnitInfoDiv.setAttribute("class", "infos-ue");

  const detailsDiv = document.createElement("div");
  detailsDiv.setAttribute("class", "details clearfix");

  const detailsCraDiv = document.createElement("div");
  detailsCraDiv.setAttribute("class", "details-cra clearfix");

  if (ects != null) {
    const ectsDiv = document.createElement("div");
    ectsDiv.setAttribute("class", "credits");
    ectsDiv.innerHTML = `${ects} ECTS`;

    detailsDiv.appendChild(ectsDiv);
  }

  if (title != null) {
    const titleHeader = document.createElement("h4");
    titleHeader.setAttribute("class", "titre");
    const titleAnchor = document.createElement("a");
    titleAnchor.setAttribute("target", "ue");
    titleAnchor.innerHTML = `${title}`;

    titleHeader.appendChild(titleAnchor);
    detailsDiv.appendChild(titleHeader);
  }

  if (code != null) {
    const codeDiv = document.createElement("div");
    codeDiv.setAttribute("class", "code");
    const codeAnchor = document.createElement("a");
    codeAnchor.setAttribute("target", "ue");
    codeAnchor.innerHTML = `${code}`;

    codeDiv.appendChild(codeAnchor);
    detailsDiv.appendChild(codeDiv);
  }

  const craHeader = document.createElement("h5");
  craHeader.setAttribute(
    "class",
    "cra_opener cra_opener_closed cra_opener_opened",
  );
  craHeader.innerHTML = "Centre(s) d'enseignement";

  const divList = document.createElement("div");
  divList.setAttribute("class", "liste closed");

  const craList = document.createElement("ul");
  craList.setAttribute("class", "cra");

  for (const center of teachingCenters) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${center}</strong>`;
    craList.appendChild(listItem);
  }

  craHeader.appendChild(divList);
  divList.appendChild(craList);

  detailsCraDiv.appendChild(craHeader);

  teachingUnitDiv.appendChild(teachingUnitInfoDiv);
  teachingUnitInfoDiv.appendChild(detailsDiv);
  teachingUnitInfoDiv.appendChild(detailsCraDiv);
  return teachingUnitDiv;
}

describe("TeachingUnit", () => {
  describe("given a valid html element", () => {
    test("returns a new valid instance", () => {
      document.body.innerHTML = newHTMLTeachingUnit(
        "Mathematical tools for computing",
        "MVA003",
        6,
      ).outerHTML;
      const el = document.getElementsByClassName("ue")[0];
      const teachingUnit = TeachingUnit.fromElement(el);

      expect(teachingUnit.code).toBe("MVA003");
      expect(teachingUnit.title).toBe("Mathematical tools for computing");
      expect(teachingUnit.ects).toBe(6);
    });
  });

  describe("given an invalid html element", () => {
    test("with missing title throws ValidationError", () => {
      document.body.innerHTML = newHTMLTeachingUnit(
        null,
        "MVA003",
        6,
      ).outerHTML;
      const el = document.getElementsByClassName("ue")[0];

      expect(() => {
        TeachingUnit.fromElement(el);
      }).toThrow("missing field: title");
    });

    test("with missing code throws ValidationError", () => {
      document.body.innerHTML = newHTMLTeachingUnit(
        "Mathematical tools for computing",
        null,
        6,
      ).outerHTML;
      const el = document.getElementsByClassName("ue")[0];

      expect(() => {
        TeachingUnit.fromElement(el);
      }).toThrow("missing field: code");
    });

    test("with missing credits throws ValidationError", () => {
      document.body.innerHTML = newHTMLTeachingUnit(
        "Mathematical tools for computing",
        "MVA003",
        null,
      ).outerHTML;

      const el = document.getElementsByClassName("ue")[0];

      expect(() => {
        TeachingUnit.fromElement(el);
      }).toThrow("missing field: credits");
    });
  });
});
