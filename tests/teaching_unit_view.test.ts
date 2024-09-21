import { TeachingUnit } from "../src/js/teaching_unit/model";
import { TeachingUnitView } from "../src/js/teaching_unit/view";
import { newHTMLTeachingUnit } from "./teaching_unit.test";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

beforeEach(() => {
  document.body.innerHTML = newHTMLTeachingUnit("foo", "BAR001", 6).outerHTML;
});

test("div have class selected after a click when state is unselected", async () => {
  const user = userEvent.setup();
  const el = document.getElementsByClassName("ue")[0] as HTMLElement;
  const teachingUnit = TeachingUnit.fromElement(el);
  new TeachingUnitView(el, teachingUnit);
  expect(el).not.toHaveClass("selected");

  await user.click(el);

  expect(el).toHaveClass("selected");
});

test("div have class validated after a click when state is selected", async () => {
  const user = userEvent.setup();
  const el = document.getElementsByClassName("ue")[0] as HTMLElement;
  const teachingUnit = TeachingUnit.fromElement(el);
  teachingUnit.select();
  new TeachingUnitView(el, teachingUnit);
  expect(el).toHaveClass("selected");
  expect(el).not.toHaveClass("validated");

  await user.click(el);

  expect(el).toHaveClass("validated");
});

test("div have no class after a click when state is validated", async () => {
  const user = userEvent.setup();
  const el = document.getElementsByClassName("ue")[0] as HTMLElement;
  const teachingUnit = TeachingUnit.fromElement(el);
  teachingUnit.validate();
  new TeachingUnitView(el, teachingUnit);

  await user.click(el);

  expect(el).not.toHaveClass("unselected");
  expect(el).not.toHaveClass("selected");
  expect(el).not.toHaveClass("validated");
});

test("div is not clickable if disabled", async () => {
  const user = userEvent.setup();
  const el = document.getElementsByClassName("ue")[0] as HTMLElement;
  const teachingUnit = TeachingUnit.fromElement(el);
  const view = new TeachingUnitView(el, teachingUnit);
  expect(el).not.toHaveClass("selected");
  view.disable();

  await user.click(el);

  expect(el).not.toHaveClass("selected");
});
