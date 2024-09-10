import { State, TeachingUnit } from "../src/js/teaching_unit/model";
import { DummyObserver, mockCallback } from "./utils.test";

function newHTMLTeachingUnit(title?: string, code?: string, ects?: number) {
  let html =
    '<div class="ue option clearfix"><div class=" infos-ue"><div class="details clearfix">';

  if (ects != null) {
    html += `<div class="credits">${ects} ECTS<span class="dico"><span class="icon icon-help_simple"></span></span></div>`;
  }
  if (title != null) {
    html +=
      '<h4 class="titre">' +
      `  <a id="intitule_5df3b7279a53cb218ffb5684789f8939" href="/servlet/uFF?OBJET=ue&amp;CODE=MVA003&amp;LANGUE=0&amp;RF=" target="ue">${title}</a>` +
      "</h4>";
  }
  if (code != null) {
    html +=
      '<div class="code">' +
      `  <a id="code_5df3b7279a53cb218ffb5684789f8939" href="/servlet/uFF?OBJET=ue&amp;CODE=MVA003&amp;LANGUE=0&amp;RF=" target="ue">${code}</a>` +
      "</div>";
  }

  html += "</div></div></div>";

  return html;
}

describe("TeachingUnit", () => {
  describe("given a valid html element", () => {
    test("returns a new valid instance", () => {
      document.body.innerHTML = newHTMLTeachingUnit(
        "Mathematical tools for computing",
        "MVA003",
        6,
      );
      const el = document.getElementsByClassName("ue")[0];

      const teachingUnit = TeachingUnit.fromElement(el);

      expect(teachingUnit.code).toBe("MVA003");
      expect(teachingUnit.title).toBe("Mathematical tools for computing");
      expect(teachingUnit.ects).toBe(6);
    });
  });

  describe("given an invalid html element", () => {
    test("with missing title throws ValidationError", () => {
      document.body.innerHTML = newHTMLTeachingUnit(null, "MVA003", 6);

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
      );

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
      );

      const el = document.getElementsByClassName("ue")[0];

      expect(() => {
        TeachingUnit.fromElement(el);
      }).toThrow("missing field: credits");
    });
  });

  test.each([
    [State.Unselected, State.Selected],
    [State.Selected, State.Validated],
    [State.Validated, State.Unselected],
  ])("next state after %d to be %d", (currentState, nextState) => {
    const teachingUnit = new TeachingUnit(
      "Architecture des machines",
      "NFA004",
      4,
      currentState,
    );

    teachingUnit.toggle();

    expect(teachingUnit.state).toBe(nextState);
  });

  test("notify observer on toggle", () => {
    const obs = new DummyObserver();
    const teachingUnit = new TeachingUnit(
      "Architecture des machines",
      "NFA004",
      4,
    );

    teachingUnit.attach(obs);
    teachingUnit.toggle();

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(teachingUnit);
  });
});
