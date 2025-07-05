import { State } from "domain/models/state";
import { TeachingUnitViewModel } from "../view_models/teaching_units_viewmodel";
import { Observer } from "utils/observer";
import { TeachingUnit } from "domain/models/teaching_unit";

export class TeachingUnitEntry implements Observer {
  private el: HTMLElement;
  private viewModel: TeachingUnitViewModel;
  private code: string;

  private clickHandler: (event: MouseEvent) => void;

  constructor(
    viewModel: TeachingUnitViewModel,
    teachingUnit: TeachingUnit,
    el: HTMLElement,
  ) {
    this.el = el;
    this.viewModel = viewModel;
    this.code = teachingUnit.code;
    this.viewModel.addListener(this);
    this.clickHandler = this.viewModel.toggleTeachingUnit.bind(
      this.viewModel,
      teachingUnit.code,
    );

    this.disableEventPropagation();
    this.el.addEventListener("click", this.clickHandler);
    this.update();
  }

  private disableEventPropagation() {
    Array.of(
      this.el.querySelector("h5, .cra_opener"),
      this.el.querySelector(".titre a"),
      this.el.querySelector(".code a"),
    )
      .filter((e) => e)
      .forEach((e) => {
        e.addEventListener("click", (e) => e.stopPropagation());
      });
  }

  /// Updates the CSS classes related to the teaching unit's selection/validation state.
  private updateStateClass(teachingUnit: TeachingUnit): void {
    switch (teachingUnit.state) {
      case State.Unselected:
        this.el.classList.remove("validated", "selected");
        break;
      case State.Selected:
        this.el.classList.add("selected");
        this.el.classList.remove("validated");
        break;
      case State.Validated:
        this.el.classList.add("validated");
        this.el.classList.remove("selected");
        break;
    }
  }

  /// Updates the CSS class related to the enabled/disabled state.
  private updateEnabledClass(teachingUnit: TeachingUnit): void {
    if (teachingUnit.isEnabled) {
      this.el.classList.remove("disabled");
      this.el.addEventListener("click", this.clickHandler);
    } else {
      this.el.classList.add("disabled");
      this.el.removeEventListener("click", this.clickHandler);
    }
  }

  /// Updates the widget's appearance based on the teaching unit's state.
  public update(): void {
    const teachingUnit = this.viewModel.getTeachingUnit(this.code);
    if (!teachingUnit) {
      console.error(`Teaching unit with code ${this.code} not found.`);
      return;
    }

    this.updateStateClass(teachingUnit);
    this.updateEnabledClass(teachingUnit);
  }
}
