import { TeachingUnitRepository } from "./teaching_unit/repository";
import { TeachingUnitView } from "./teaching_unit/view";

function getCurriculum() {
  const curriculum = document.getElementById("parcours");
  if (curriculum == null) {
    throw new Error("no curriculum founded");
  }
  return curriculum;
}

function getTeachingUnitElements(curriculum: Element) {
  return Array.from(curriculum.getElementsByClassName("ue"));
}

function stopPropagation(e: Event) {
  e.stopPropagation();
}

const curriculum = getCurriculum();
const teachingUnitElements = getTeachingUnitElements(curriculum);
teachingUnitElements.forEach(async (el: Element) => {
  // Prevent from selecting teaching unit when clicking on a link on it.
  try {
    Array.of(
      el.querySelector("h5, .cra_opener"),
      el.querySelector(".titre a"),
      el.querySelector(".code a"),
    ).forEach((e) => e.addEventListener("click", stopPropagation));
  } catch (error) {
    console.warn(`Failed to disable event propagation (${error})`);
  }

  let teachingUnit = undefined;
  try {
    teachingUnit = await TeachingUnitRepository.getFromLocalStorage(el);
  } catch (error) {
    console.warn(`Failed to get teaching unit from element (${error})`);
    return;
  }

  new TeachingUnitRepository(teachingUnit);
  new TeachingUnitView(el, teachingUnit);
});
