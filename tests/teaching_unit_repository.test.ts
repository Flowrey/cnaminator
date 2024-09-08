import { State, TeachingUnit } from "../src/js/teaching_unit/model";
import { TeachingUnitRepository } from "../src/js/teaching_unit/repository";

test("save and delete from/to local storage", () => {
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

  new TeachingUnitRepository(teachingUnit);
  TeachingUnitRepository.getFromLocalStorage(el).then((teaching_unit) => {
    expect(teaching_unit.state).toBe(State.Unselected);
  });

  teachingUnit.toggle();
  TeachingUnitRepository.getFromLocalStorage(el).then((teaching_unit) => {
    expect(teaching_unit.state).toBe(State.Selected);
  });

  teachingUnit.toggle();
  TeachingUnitRepository.getFromLocalStorage(el).then((teaching_unit) => {
    expect(teaching_unit.state).toBe(State.Validated);
  });

  teachingUnit.toggle();
  TeachingUnitRepository.getFromLocalStorage(el).then((teaching_unit) => {
    expect(teaching_unit.state).toBe(State.Unselected);
  });
});
