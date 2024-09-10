import { AbstractSubject, Observer, Subject } from "../src/js/utils";

export const mockCallback = jest.fn();

export class DummyObserver implements Observer {
  update(subject: Subject): void {
    mockCallback(subject);
  }
}

export class DummySubject extends AbstractSubject {
  toggle() {
    this.notify();
  }
}

test("detaching nonexistent observer throws Error", () => {
  const obs = new DummyObserver();
  const subject = new DummySubject();

  subject.attach(obs);
  subject.detach(obs);

  expect(() => {
    subject.detach(obs);
  }).toThrow("Nonexistent observer");
});

test("attaching twice the same observer throws Error", () => {
  const obs = new DummyObserver();
  const subject = new DummySubject();

  subject.attach(obs);

  expect(() => {
    subject.attach(obs);
  }).toThrow("Observer has been attached already");
});
