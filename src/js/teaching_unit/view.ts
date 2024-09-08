import { Observer } from "../utils";
import { State, TeachingUnit } from "./model";

export class TeachingUnitView implements Observer {
  private subject: TeachingUnit;
  private el: Element;

  constructor(el: Element, s: TeachingUnit) {
    this.subject = s;
    this.el = el;

    this.init();
    this.subject.attach(this);
    this.el.addEventListener("click", () => {
      this.subject.toggle();
    });
  }

  private init() {
    switch (this.subject.state) {
      case State.Selected:
        this.el.classList.add("selected");
        break;
      case State.Validated:
        this.el.classList.add("validated");
        break;
    }
  }

  public update(subject: TeachingUnit): void {
    switch (subject.state) {
      case State.Unselected:
        this.el.classList.remove("validated");
        break;
      case State.Selected:
        this.el.classList.add("selected");
        break;
      case State.Validated:
        this.el.classList.replace("selected", "validated");
        break;
    }
  }
}
