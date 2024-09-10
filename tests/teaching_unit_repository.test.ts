import { State, TeachingUnit } from "../src/js/teaching_unit/model";
import { TeachingUnitRepository } from "../src/js/teaching_unit/repository";
import browser from "./__mocks__/webextension-polyfill";

test("save state to local storage", () => {
  const teachingUnit = new TeachingUnit("foo", "UTC505", 3, State.Validated);

  TeachingUnitRepository.saveStateToLocalStorage(teachingUnit);

  expect(browser.storage.local.set).toHaveBeenCalledWith({
    UTC505: State.Validated,
  });
});

test("get existing state from local storage", async () => {
  const teachingUnit = new TeachingUnit("foo", "UTC505", 3, State.Validated);
  browser.storage.local.get.mockImplementation(() =>
    Promise.resolve({ UTC505: State.Validated }),
  );

  const state =
    await TeachingUnitRepository.getStateFromLocalStorage(teachingUnit);

  expect(state).toBe(State.Validated);
  expect(browser.storage.local.get).toHaveBeenCalledWith("UTC505");
});

test("get nonexisting state from local storage", async () => {
  const teachingUnit = new TeachingUnit("foo", "UTC505", 3, State.Unselected);
  browser.storage.local.get.mockImplementation(() => Promise.resolve({}));

  const state =
    await TeachingUnitRepository.getStateFromLocalStorage(teachingUnit);

  expect(state).toBe(State.Unselected);
  expect(browser.storage.local.get).toHaveBeenCalledWith("UTC505");
});

test("remove state from local storage", () => {
  const teachingUnit = new TeachingUnit("foo", "UTC505", 3, State.Validated);
  TeachingUnitRepository.saveStateToLocalStorage(teachingUnit);

  TeachingUnitRepository.removeStateFromLocalStorage(teachingUnit);

  expect(browser.storage.local.remove).toHaveBeenCalledWith("UTC505");
});

test("remove state is called on update when state is unselected", () => {
  const teachingUnit = new TeachingUnit("foo", "UTC505", 3, State.Validated);
  new TeachingUnitRepository(teachingUnit);

  teachingUnit.toggle();

  expect(browser.storage.local.remove).toHaveBeenCalledWith("UTC505");
});

test("save state is called on update when state is selected", () => {
  const teachingUnit = new TeachingUnit("foo", "UTC505", 3, State.Unselected);
  new TeachingUnitRepository(teachingUnit);

  teachingUnit.toggle();

  expect(browser.storage.local.set).toHaveBeenCalledWith({
    UTC505: State.Selected,
  });
});

test("save state is called on update when state is validated", () => {
  const teachingUnit = new TeachingUnit("foo", "UTC505", 3, State.Selected);
  new TeachingUnitRepository(teachingUnit);

  teachingUnit.toggle();

  expect(browser.storage.local.set).toHaveBeenCalledWith({
    UTC505: State.Validated,
  });
});
