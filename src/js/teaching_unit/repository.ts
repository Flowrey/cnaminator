import { Observer } from "../utils";
import { State, TeachingUnit } from "./model";
import browser from "webextension-polyfill";

export class TeachingUnitRepository implements Observer {
  constructor(s: TeachingUnit) {
    s.attach(this);
  }

  public update(subject: TeachingUnit): void {
    switch (subject.state) {
      case State.Unselected:
        TeachingUnitRepository.removeStateFromLocalStorage(subject);
        break;
      case State.Selected:
      case State.Validated:
        TeachingUnitRepository.saveStateToLocalStorage(subject);
        break;
    }
  }

  public static async getStateFromLocalStorage(subject: TeachingUnit) {
    const record = await browser.storage.local.get(subject.code);
    const state = <State>record[subject.code];
    if (state) {
      return state;
    } else {
      return State.Unselected;
    }
  }

  public static removeStateFromLocalStorage(subject: TeachingUnit) {
    browser.storage.local.remove(subject.code).then(
      () => {
        console.debug(`${subject.code} removed from local storage`);
      },
      (err) => {
        console.error(`Failed to remove ${subject.code}, ${err}`);
      },
    );
  }

  public static saveStateToLocalStorage(subject: TeachingUnit) {
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
