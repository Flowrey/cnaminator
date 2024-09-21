import { AbstractSubject } from "../utils";

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export enum State {
  Unselected,
  Selected,
  Validated,
}

export class TeachingUnit extends AbstractSubject {
  public title: string;
  public code: string;
  public ects: number;
  public state: State;
  public teachingCenters: Array<string> | null;

  constructor(
    title: string,
    code: string,
    ects: number,
    state?: State,
    teachingCenters?: string[],
  ) {
    super();
    this.title = title;
    this.code = code;
    this.ects = ects;
    this.teachingCenters = teachingCenters;
    this.state = state || State.Unselected;
  }

  public static fromElement(el: Element) {
    const title = el.querySelector(".titre a");
    if (title == undefined) {
      throw new ValidationError("missing field: title");
    }

    const code = el.querySelector(".code a");
    if (code == undefined) {
      throw new ValidationError("missing field: code");
    }

    const ects = el.querySelector(".credits");
    if (ects == undefined) {
      throw new ValidationError("missing field: credits");
    }

    const cra = el.querySelector(".cra");
    const teachingCenters = cra
      ? Array.from(cra.children).map((center) =>
          center.querySelector("strong").innerHTML.trim(),
        )
      : null;

    return new TeachingUnit(
      title.innerHTML,
      code.innerHTML,
      parseInt(ects.innerHTML),
      State.Unselected,
      teachingCenters,
    );
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
