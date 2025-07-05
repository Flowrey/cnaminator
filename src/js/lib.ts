import { DOMService } from "data/services/dom_service";
import { TeachingCenterSelector } from "ui/teaching_unit/widgets/teaching_center_selector";
import { TeachingUnit } from "domain/models/teaching_unit";
import { TeachingUnitEntry } from "ui/teaching_unit/widgets/teaching_unit_entry";
import { TeachingUnitRepositoryLocal } from "data/repositories/teaching_unit/teaching_unit_repository_local";
import { TeachingUnitViewModel } from "ui/teaching_unit/view_models/teaching_units_viewmodel";
import { ECTSCounter } from "ui/teaching_unit/widgets/ects_counter";

export async function main(document: Document): Promise<void> {
  const domService = new DOMService(document);
  const teachingUnitRepository = new TeachingUnitRepositoryLocal(domService);
  const viewModel = new TeachingUnitViewModel(teachingUnitRepository);
  await viewModel.ready; // Ensure the viewModel is ready before proceeding

  const curriculum = domService.getCurriculumElement();

  const teachingCenterSelector = domService.newTeachingCenterSelectorElement();
  curriculum.insertBefore(teachingCenterSelector, curriculum.firstChild);

  const ectsCounter = domService.newECTSCounterElement();
  curriculum.insertBefore(ectsCounter, teachingCenterSelector.nextSibling);

  const teachingUnitElements = domService.getTeachingUnitElements();
  teachingUnitElements.forEach((el: HTMLElement) => {
    try {
      const model = TeachingUnit.fromElement(el);
      new TeachingUnitEntry(viewModel, model, el);
      new TeachingCenterSelector(teachingCenterSelector, viewModel);
      new ECTSCounter(ectsCounter, viewModel);
    } catch (error) {
      console.warn(`Failed to create TeachingUnit from element: ${error}`);
    }
  });
}
