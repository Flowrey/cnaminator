import { Observer, Subject } from "../utils";

export enum State {
  Unselected,
  Selected,
  Validated,
}

export class TeachingUnit implements Subject {
  public title: string;
  public code: string;
  public ects: number;
  public state: State;

  private observers: Observer[] = [];

  constructor(title: string, code: string, ects: number, state?: State) {
    this.title = title;
    this.code = code;
    this.ects = ects;
    this.state = state || State.Unselected;
  }

  public static fromElement(el: Element) {
    const title = el.querySelector(".titre a");
    if (title == undefined) {
      throw new Error("No field: title");
    }

    const code = el.querySelector(".code a");
    if (code == undefined) {
      throw new Error("No field: code");
    }

    const ects = el.querySelector(".credits");
    if (ects == undefined) {
      throw new Error("No field: credits");
    }

    return new TeachingUnit(
      title.innerHTML,
      code.innerHTML,
      parseInt(ects.innerHTML),
    );
  }

  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      throw new Error("Observer has been attached already");
    }

    this.observers.push(observer);
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      throw new Error("Nonexistent observer");
    }

    this.observers.splice(observerIndex, 1);
  }

  public notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  public toggle() {
    switch (this.state) {
      case State.Unselected:
        this.select();
        break;
      case State.Selected:
        this.validate();
        break;
      case State.Validated:
        this.unselect();
        break;
    }
    this.notify();
  }

  public unselect() {
    this.state = State.Unselected;
    this.notify();
  }

  public select() {
    this.state = State.Selected;
    this.notify();
  }

  public validate() {
    this.state = State.Validated;
    this.notify();
  }
}
