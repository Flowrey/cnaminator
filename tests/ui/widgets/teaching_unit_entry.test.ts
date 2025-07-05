import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { TeachingUnit } from "domain/models/teaching_unit";
import { TeachingUnitViewModel } from "ui/teaching_unit/view_models/teaching_units_viewmodel";
import { TeachingUnitEntry } from "ui/teaching_unit/widgets/teaching_unit_entry";
import { TeachingUnitRepositoryMemory } from "data/repositories/teaching_unit/teaching_unit_repository_memory";
import { newHTMLTeachingUnit } from "../../models/teaching_unit.test";

beforeEach(() => {
  document.body.innerHTML = newHTMLTeachingUnit("foo", "BAR001", 6).outerHTML;
});

test("div have class selected after a click when state is unselected", async () => {
  const user = userEvent.setup();
  const el = document.getElementsByClassName("ue")[0] as HTMLElement;
  const teachingUnit = TeachingUnit.fromElement(el);

  const repo = new TeachingUnitRepositoryMemory();
  repo.setTeachingUnit(teachingUnit);

  const viewModel = new TeachingUnitViewModel(repo);
  await viewModel.ready;
  new TeachingUnitEntry(viewModel, teachingUnit, el);

  expect(el).not.toHaveClass("selected");

  await user.click(el);

  expect(el).toHaveClass("selected");
});

test("div have class validated after a click when state is selected", async () => {
  const user = userEvent.setup();
  const el = document.getElementsByClassName("ue")[0] as HTMLElement;
  const teachingUnit = TeachingUnit.fromElement(el);

  const repo = new TeachingUnitRepositoryMemory();
  repo.setTeachingUnit(teachingUnit);

  const viewModel = new TeachingUnitViewModel(repo);
  await viewModel.ready;
  new TeachingUnitEntry(viewModel, teachingUnit, el);

  await user.click(el);

  expect(el).toHaveClass("selected");
  expect(el).not.toHaveClass("validated");

  await user.click(el);

  expect(el).toHaveClass("validated");
});

test("div have no class after a click when state is validated", async () => {
  const user = userEvent.setup();
  const el = document.getElementsByClassName("ue")[0] as HTMLElement;
  const teachingUnit = TeachingUnit.fromElement(el);

  const repo = new TeachingUnitRepositoryMemory();
  repo.setTeachingUnit(teachingUnit);

  const viewModel = new TeachingUnitViewModel(repo);
  await viewModel.ready;
  new TeachingUnitEntry(viewModel, teachingUnit, el);

  await user.click(el);
  await user.click(el);
  await user.click(el);

  expect(el).not.toHaveClass("unselected");
  expect(el).not.toHaveClass("selected");
  expect(el).not.toHaveClass("validated");
});

test("div is not clickable if disabled", async () => {
  const user = userEvent.setup();
  const el = document.getElementsByClassName("ue")[0] as HTMLElement;
  const teachingUnit = TeachingUnit.fromElement(el);

  const repo = new TeachingUnitRepositoryMemory();
  repo.setTeachingUnit(teachingUnit);

  const viewModel = new TeachingUnitViewModel(repo);
  await viewModel.ready;
  new TeachingUnitEntry(viewModel, teachingUnit, el);

  viewModel.filterTeachingUnitByCenter("Springfield");
  expect(el).not.toHaveClass("selected");

  await user.click(el);

  expect(el).not.toHaveClass("selected");
});
