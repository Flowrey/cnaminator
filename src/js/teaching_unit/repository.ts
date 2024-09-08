import { Observer } from "../utils";
import { State, TeachingUnit } from "./model";
import * as browser from "webextension-polyfill";

export class TeachingUnitRepository implements Observer {
  constructor(s: TeachingUnit) {
    s.attach(this);
  }

  public update(subject: TeachingUnit): void {
    switch (subject.state) {
      case State.Unselected:
        this.removeFromLocalStorage(subject);
        break;
      case State.Selected:
      case State.Validated:
        this.saveToLocalStorage(subject);
        break;
    }
  }

  public static async getFromLocalStorage(el: Element) {
    const teachingUnit = TeachingUnit.fromElement(el);
    const record = await browser.storage.local.get(teachingUnit.code);
    const state = <State>record[teachingUnit.code];
    switch (state) {
      case State.Selected:
        teachingUnit.select();
        break;
      case State.Validated:
        teachingUnit.validate();
        break;
    }
    return teachingUnit;
  }

  private removeFromLocalStorage(subject: TeachingUnit) {
    browser.storage.local.remove(subject.code).then(
      () => {
        console.debug(`${subject.code} removed from local storage`);
      },
      (err) => {
        console.error(`Failed to remove ${subject.code}, ${err}`);
      },
    );
  }

  private saveToLocalStorage(subject: TeachingUnit) {
    const record = {};
    record[subject.code] = subject.state;
    browser.storage.local.set(record).then(
      () => {
        console.debug(`${subject.code} saved to local storage`);
      },
      (err) => {
        console.error(`Failed to save ${subject.code}, ${err}`);
      },
    );
  }
}
