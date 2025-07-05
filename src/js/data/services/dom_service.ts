/**
 * This class provides methods to interact with the DOM of the curriculum page.
 * It allows retrieval of curriculum and teaching unit elements, and creation of new elements for UI components.
 */
export class DOMService {
  private document: Document;

  constructor(document: Document) {
    this.document = document;
  }

  public getCurriculumElement(): Element {
    const curriculum = this.document.getElementById("parcours");
    if (!curriculum) {
      throw new Error("no curriculum founded");
    }
    return curriculum;
  }

  public getTeachingUnitElements(): Array<Element> {
    const curriculum = this.getCurriculumElement();
    return Array.from(curriculum.getElementsByClassName("ue"));
  }

  public newTeachingCenterSelectorElement() {
    const teachingCenterSelect = this.document.createElement("select");
    teachingCenterSelect.id = "teaching-center-selector";

    const opt = this.document.createElement("option");
    opt.value = "";
    opt.text = "Lieu(x)";
    teachingCenterSelect.add(opt);

    return teachingCenterSelect;
  }

  public newECTSCounterElement() {
    const ectsCounter = this.document.createElement("p");
    ectsCounter.textContent = `ECTS: 0`;

    return ectsCounter;
  }
}
