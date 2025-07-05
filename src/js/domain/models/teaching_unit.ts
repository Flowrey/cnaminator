import { AbstractSubject } from "utils/observer";
import { ValidationError } from "utils/errors";
import { State } from "domain/models/state";

export class TeachingUnit extends AbstractSubject {
  public title: string;
  public code: string;
  public ects: number;
  public state: State;
  public isEnabled: boolean;
  public teachingCenters: Array<string> | null;

  constructor(
    title: string,
    code: string,
    ects: number,
    state?: State,
    isEnabled?: boolean,
    teachingCenters?: string[],
  ) {
    super();
    this.title = title;
    this.code = code;
    this.ects = ects;
    this.teachingCenters = teachingCenters;
    this.isEnabled = isEnabled ?? true;
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
      true,
      teachingCenters,
    );
  }
}
