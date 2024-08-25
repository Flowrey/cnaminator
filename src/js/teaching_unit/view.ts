import { Observer } from "../utils";
import { State, TeachingUnit } from "./model";
import * as browser from "webextension-polyfill";

export class TeachingUnitView implements Observer {
  private subject: TeachingUnit;
  private el: Element;

  constructor(el: Element, s: TeachingUnit) {
    this.subject = s;
    this.el = el;

    this.subject.attach(this);
    this.el.addEventListener("click", () => {
      this.subject.toggle();
      this.saveToLocalStorage();
    });
    this.init();
  }

  private saveToLocalStorage() {
    const record = {};
    record[this.subject.code] = this.subject.state;
    browser.storage.local.set(record).then(
      () => {
        console.debug(`${this.subject.code} saved to local storage`);
      },
      (err) => {
        console.error(`Failed to save ${this.subject.code}, ${err}`);
      },
    );
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
