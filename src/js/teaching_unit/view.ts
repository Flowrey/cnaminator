import { Observer } from "../utils";
import { State, TeachingUnit } from "./model";

export class TeachingUnitView implements Observer {
  private subject: TeachingUnit;
  private el: Element;

  constructor(el: Element, s: TeachingUnit) {
    this.subject = s;
    this.el = el;

    this.init();
    this.tryDisableEventPropagation();
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

  private disableEventPropagation() {
    Array.of(
      this.el.querySelector("h5, .cra_opener"),
      this.el.querySelector(".titre a"),
      this.el.querySelector(".code a"),
    ).forEach((e) => e.addEventListener("click", (e) => e.stopPropagation()));
  }

  private tryDisableEventPropagation() {
    try {
      this.disableEventPropagation();
    } catch (error) {
      console.warn(`Failed to disable event propagation (${error})`);
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
