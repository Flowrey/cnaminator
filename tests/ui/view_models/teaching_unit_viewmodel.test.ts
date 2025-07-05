import { DummyObserver, mockCallback } from "../../utils/observer.test";
import { State } from "domain/models/state";
import { TeachingUnitViewModel } from "ui/teaching_unit/view_models/teaching_units_viewmodel";
import { TeachingUnit } from "domain/models/teaching_unit";
import { TeachingUnitRepositoryMemory } from "data/repositories/teaching_unit/teaching_unit_repository_memory";

test.each([
  [State.Unselected, State.Selected],
  [State.Selected, State.Validated],
  [State.Validated, State.Unselected],
])("next state after %d to be %d", async (currentState, nextState) => {
  const teachingUnit = new TeachingUnit(
    "Architecture des machines",
    "NFA004",
    4,
    currentState,
  );
  const repo = new TeachingUnitRepositoryMemory();
  repo.setTeachingUnit(teachingUnit);

  const viewModel = new TeachingUnitViewModel(repo);
  await viewModel.ready;

  viewModel.toggleTeachingUnit(teachingUnit.code);
  expect(teachingUnit.state).toBe(nextState);
});

test("getTeachingUnit returns null for unknown code", async () => {
  const repo = new TeachingUnitRepositoryMemory();
  const viewModel = new TeachingUnitViewModel(repo);
  await viewModel.ready;

  const result = viewModel.getTeachingUnit("UNKNOWN");
  expect(result).toBeNull();
});

test("notify observer on toggle", async () => {
  const obs = new DummyObserver();
  const teachingUnit = new TeachingUnit(
    "Architecture des machines",
    "NFA004",
    4,
  );
  const repo = new TeachingUnitRepositoryMemory();
  repo.setTeachingUnit(teachingUnit);

  const viewModel = new TeachingUnitViewModel(repo);
  await viewModel.ready;

  viewModel.addListener(obs);
  viewModel.toggleTeachingUnit(teachingUnit.code);

  expect(mockCallback).toHaveBeenCalledTimes(1);
  expect(mockCallback).toHaveBeenCalledWith();
});
