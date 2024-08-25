import { State, TeachingUnit } from "../src/js/teaching_unit/model";
import { Observer } from "../src/js/utils";

test("get teaching unit from element", () => {
  // Set up our document body
  document.body.innerHTML =
    '<div class="ue option clearfix">' +
    '  <div class=" infos-ue">' +
    '    <div class="details clearfix">' +
    '      <div class="credits">6 ECTS<span class="dico"><span class="icon icon-help_simple"></span></span></div>' +
    '      <h4 class="titre">' +
    '        <a id="intitule_5df3b7279a53cb218ffb5684789f8939" href="/servlet/uFF?OBJET=ue&amp;CODE=MVA003&amp;LANGUE=0&amp;RF=" target="ue">Mathematical tools for computing</a>' +
    "      </h4>" +
    '      <div class="code">' +
    '        <a id="code_5df3b7279a53cb218ffb5684789f8939" href="/servlet/uFF?OBJET=ue&amp;CODE=MVA003&amp;LANGUE=0&amp;RF=" target="ue">MVA003</a>' +
    "      </div>" +
    "    </div>" +
    "  </div>" +
    "</div>";
  const el = document.getElementsByClassName("ue")[0];
  const teachingUnit = TeachingUnit.fromElement(el);
  expect(teachingUnit.code).toBe("MVA003");
  expect(teachingUnit.title).toBe("Mathematical tools for computing");
  expect(teachingUnit.ects).toBe(6);
});

test("get teaching unit from element with missing title", () => {
  // Set up our document body
  document.body.innerHTML =
    '<div class="ue option clearfix">' +
    '  <div class=" infos-ue">' +
    '    <div class="details clearfix">' +
    '      <div class="credits">6 ECTS<span class="dico"><span class="icon icon-help_simple"></span></span></div>' +
    '      <div class="code">' +
    '        <a id="code_5df3b7279a53cb218ffb5684789f8939" href="/servlet/uFF?OBJET=ue&amp;CODE=MVA003&amp;LANGUE=0&amp;RF=" target="ue">MVA003</a>' +
    "      </div>" +
    "    </div>" +
    "  </div>" +
    "</div>";
  const el = document.getElementsByClassName("ue")[0];

  expect(() => {
    TeachingUnit.fromElement(el);
  }).toThrow("No field: title");
});

test("get teaching unit from element with missing code", () => {
  // Set up our document body
  document.body.innerHTML =
    '<div class="ue option clearfix">' +
    '  <div class=" infos-ue">' +
    '    <div class="details clearfix">' +
    '      <h4 class="titre">' +
    '        <a id="intitule_5df3b7279a53cb218ffb5684789f8939" href="/servlet/uFF?OBJET=ue&amp;CODE=MVA003&amp;LANGUE=0&amp;RF=" target="ue">Mathematical tools for computing</a>' +
    "      </h4>" +
    '      <div class="credits">6 ECTS<span class="dico"><span class="icon icon-help_simple"></span></span></div>' +
    "    </div>" +
    "  </div>" +
    "</div>";
  const el = document.getElementsByClassName("ue")[0];

  expect(() => {
    TeachingUnit.fromElement(el);
  }).toThrow("No field: code");
});

test("get teaching unit from element with missing credits", () => {
  // Set up our document body
  document.body.innerHTML =
    '<div class="ue option clearfix">' +
    '  <div class=" infos-ue">' +
    '    <div class="details clearfix">' +
    '      <h4 class="titre">' +
    '        <a id="intitule_5df3b7279a53cb218ffb5684789f8939" href="/servlet/uFF?OBJET=ue&amp;CODE=MVA003&amp;LANGUE=0&amp;RF=" target="ue">Mathematical tools for computing</a>' +
    "      </h4>" +
    '      <div class="code">' +
    '        <a id="code_5df3b7279a53cb218ffb5684789f8939" href="/servlet/uFF?OBJET=ue&amp;CODE=MVA003&amp;LANGUE=0&amp;RF=" target="ue">MVA003</a>' +
    "      </div>" +
    "    </div>" +
    "  </div>" +
    "</div>";
  const el = document.getElementsByClassName("ue")[0];

  expect(() => {
    TeachingUnit.fromElement(el);
  }).toThrow("No field: credits");
});

test("toggle teaching unit", () => {
  const teachingUnit = new TeachingUnit(
    "Architecture des machines",
    "NFA004",
    4,
  );

  expect(teachingUnit.state).toBe(State.Unselected);
  teachingUnit.toggle();
  expect(teachingUnit.state).toBe(State.Selected);
  teachingUnit.toggle();
  expect(teachingUnit.state).toBe(State.Validated);
  teachingUnit.toggle();
  expect(teachingUnit.state).toBe(State.Unselected);
});

test("observe teaching unit", () => {
  class DummyObserver implements Observer {
    update(subject: TeachingUnit): void {
      subject.state = State.Unselected;
    }
  }

  const obs = new DummyObserver();
  const teachingUnit = new TeachingUnit(
    "Architecture des machines",
    "NFA004",
    4,
  );

  teachingUnit.attach(obs);
  expect(teachingUnit.state).toBe(State.Unselected);
  teachingUnit.toggle();

  expect(teachingUnit.state).toBe(State.Unselected);

  teachingUnit.detach(obs);
  teachingUnit.toggle();
  expect(teachingUnit.state).toBe(State.Selected);
});

test("detach nonexistent observer", () => {
  class DummyObserver implements Observer {
    update(subject: TeachingUnit): void {
      subject.state = State.Unselected;
    }
  }
  const obs = new DummyObserver();
  const teachingUnit = new TeachingUnit(
    "Architecture des machines",
    "NFA004",
    4,
  );

  expect(() => {
    teachingUnit.detach(obs);
  }).toThrow("Nonexistent observer");
});

test("attach twice observer", () => {
  class DummyObserver implements Observer {
    update(subject: TeachingUnit): void {
      subject.state = State.Unselected;
    }
  }
  const obs = new DummyObserver();
  const teachingUnit = new TeachingUnit(
    "Architecture des machines",
    "NFA004",
    4,
  );
  teachingUnit.attach(obs);
  expect(() => {
    teachingUnit.attach(obs);
  }).toThrow("Observer has been attached already");
});
