import { TeachingUnitRepository } from "./teaching_unit/repository";
import { TeachingUnitView } from "./teaching_unit/view";
import { TeachingUnit, ValidationError } from "./teaching_unit/model";

export function getCurriculum(doc: Document) {
  const curriculum = doc.getElementById("parcours");
  if (curriculum == null) {
    throw new Error("no curriculum founded");
  }
  return curriculum;
}

export function getTeachingUnitElements(curriculum: Element) {
  return Array.from(curriculum.getElementsByClassName("ue"));
}

export function main(doc: Document) {
  const curriculum = getCurriculum(doc);
  const teachingUnitElements = getTeachingUnitElements(curriculum);
  teachingUnitElements.forEach(async (el: Element) => {
    try {
      const teachingUnit = TeachingUnit.fromElement(el);
      teachingUnit.state =
        await TeachingUnitRepository.getStateFromLocalStorage(teachingUnit);

      new TeachingUnitRepository(teachingUnit);
      new TeachingUnitView(el, teachingUnit);
    } catch (error) {
      if (error instanceof ValidationError) {
        console.warn(`Failed to get teaching unit from element (${error})`);
      } else {
        console.error(`An unexpected error occurred (${error})`);
      }
    }
  });
}
