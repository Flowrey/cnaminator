import { TeachingUnitViewModel } from "ui/teaching_unit/view_models/teaching_units_viewmodel";

export class TeachingCenterSelector {
  private el: HTMLSelectElement;
  private viewModel: TeachingUnitViewModel;

  constructor(el: HTMLSelectElement, viewModel: TeachingUnitViewModel) {
    this.el = el;
    this.viewModel = viewModel;

    this.viewModel.teachingUnits.forEach((teachingUnit) => {
      const teachingCenters = teachingUnit.teachingCenters;
      if (teachingCenters) {
        teachingCenters
          .filter((center) => this.el.namedItem(center) == null)
          .forEach((center) => {
            const opt = document.createElement("option");
            opt.id = center;
            opt.value = center;
            opt.text = center;
            this.el.add(opt);
          });
      }
    });

    this.el.addEventListener("change", (e) => {
      this.viewModel.filterTeachingUnitByCenter(
        (e.target as HTMLSelectElement).value,
      );
    });
  }
}
