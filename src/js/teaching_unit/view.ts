import { Observer } from "../utils";
import { State, TeachingUnit } from "./model";

export class TeachingUnitView implements Observer {
  public subject: TeachingUnit;
  public el: HTMLElement;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private clickHandler: any;
  private isEnable: boolean;

  constructor(el: HTMLElement, s: TeachingUnit) {
    this.subject = s;
    this.el = el;

    this.init();
    this.tryDisableEventPropagation();
    this.subject.attach(this);
    this.clickHandler = this.toggleTeachingUnit.bind(this);
    this.enable();
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

  private toggleTeachingUnit() {
    this.subject.toggle();
  }

  public disable() {
    if (this.isEnable === false) {
      return;
    }
    this.isEnable = false;
    this.el.classList.add("disabled");
    this.el.removeEventListener("click", this.clickHandler);
  }

  public enable() {
    if (this.isEnable === true) {
      return;
    }
    this.isEnable = true;
    this.el.classList.remove("disabled");
    this.el.addEventListener("click", this.clickHandler);
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
