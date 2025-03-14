import { TeachingUnitRepository } from "./teaching_unit/repository";
import { TeachingUnitView } from "./teaching_unit/view";
import { State, TeachingUnit, ValidationError } from "./teaching_unit/model";
import { Observer } from "./utils";

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

export function newTeachingCenterSelector(doc: Document) {
  const teachingCenterSelect = doc.createElement("select");
  teachingCenterSelect.id = "teaching-center-selector";

  const opt = document.createElement("option");
  opt.value = "";
  opt.text = "Lieu(x)";
  teachingCenterSelect.add(opt);

  return teachingCenterSelect;
}

export class ECTSCounter implements Observer {
  ref: HTMLParagraphElement;
  value: number;

  constructor(doc: Document) {
    const ectsCount = doc.createElement("p");
    ectsCount.textContent = `ECTS: 0`;

    this.ref = ectsCount;
    this.value = 0;
  }

  decr(v: number) {
    this.value -= v;
    this.ref.textContent = `ECTS: ${this.value}`;
  }

  incr(v: number) {
    this.value += v;
    this.ref.textContent = `ECTS: ${this.value}`;
  }

  update(subject: TeachingUnit): void {
    switch (subject.state) {
      case State.Unselected:
        this.decr(subject.ects);
        break;
      case State.Selected:
        break;
      case State.Validated:
        this.incr(subject.ects);
        break;
    }
  }
}

export function addTeachingCentersToSelect(
  selector: HTMLSelectElement,
  teachingCenters: Array<string>,
) {
  if (teachingCenters == null) {
    return;
  }

  teachingCenters
    .filter((center) => selector.namedItem(center) == null)
    .forEach((center) => {
      const opt = document.createElement("option");
      opt.id = center;
      opt.value = center;
      opt.text = center;
      selector.add(opt);
    });
}

export function filterTeachingUnit(
  view: TeachingUnitView,
  teachingUnit: TeachingUnit,
  center: string,
) {
  view.enable();
  if (teachingUnit.teachingCenters === null) {
    return;
  }
  if (center == "") {
    return;
  }
  if (!teachingUnit.teachingCenters.includes(center)) {
    view.disable();
  }
}

export function main(doc: Document) {
  const curriculum = getCurriculum(doc);
  const teachingCenterSelect = newTeachingCenterSelector(doc);
  const ectsCounter = new ECTSCounter(doc);
  curriculum.insertBefore(teachingCenterSelect, curriculum.firstChild);
  curriculum.insertBefore(ectsCounter.ref, teachingCenterSelect.nextSibling);

  const teachingUnitElements = getTeachingUnitElements(curriculum);
  const teachingUnitViews = teachingUnitElements.map(
    async (el: HTMLElement) => {
      try {
        const teachingUnit = TeachingUnit.fromElement(el);
        const state =
          await TeachingUnitRepository.getStateFromLocalStorage(teachingUnit);
        teachingUnit.state = state;
        new TeachingUnitRepository(teachingUnit);
        const view = new TeachingUnitView(el, teachingUnit);
        teachingUnit.attach(ectsCounter);
        if (teachingUnit.state == State.Validated) {
          ectsCounter.incr(teachingUnit.ects);
        }
        addTeachingCentersToSelect(
          teachingCenterSelect,
          teachingUnit.teachingCenters,
        );
        return view;
      } catch (error) {
        if (error instanceof ValidationError) {
          console.warn(`Failed to get teaching unit from element (${error})`);
        } else {
          console.error(`An unexpected error occurred (${error})`);
        }
      }
    },
  );

  teachingCenterSelect.addEventListener("change", async (event) => {
    for (const teachingUnitView of teachingUnitViews) {
      teachingUnitView.then((teachingUnitView) => {
        if (event.target instanceof HTMLSelectElement) {
          filterTeachingUnit(
            teachingUnitView,
            teachingUnitView.subject,
            event.target.value,
          );
        }
      });
    }
  });
}
