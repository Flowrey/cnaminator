import { AbstractSubject, Observer } from "utils/observer";

export const mockCallback = jest.fn();

export class DummyObserver implements Observer {
  update(): void {
    mockCallback();
  }
}

export class DummySubject extends AbstractSubject {
  toggle() {
    this.notifyListeners();
  }
}

test("detaching nonexistent observer throws Error", () => {
  const obs = new DummyObserver();
  const subject = new DummySubject();

  subject.addListener(obs);
  subject.removeListener(obs);

  expect(() => {
    subject.removeListener(obs);
  }).toThrow("Nonexistent observer");
});

test("attaching twice the same observer throws Error", () => {
  const obs = new DummyObserver();
  const subject = new DummySubject();

  subject.addListener(obs);

  expect(() => {
    subject.addListener(obs);
  }).toThrow("Observer has been attached already");
});
