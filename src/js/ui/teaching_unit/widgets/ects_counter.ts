import { TeachingUnitViewModel } from "../view_models/teaching_units_viewmodel";
import { Observer } from "utils/observer";

export class ECTSCounter implements Observer {
  private el: HTMLElement;
  private viewModel: TeachingUnitViewModel;

  constructor(el: HTMLElement, viewModel: TeachingUnitViewModel) {
    this.el = el;
    this.viewModel = viewModel;

    viewModel.addListener(this);
    this.update();
  }

  public update(): void {
    this.el.textContent = `ECTS: ${this.viewModel.getECTSCount()}`;
  }
}
