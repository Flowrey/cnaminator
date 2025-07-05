export interface Observer {
  update(): void;
}

export interface Subject {
  addListener(observer: Observer): void;
  removeListener(observer: Observer): void;
  notifyListeners(): void;
}

export abstract class AbstractSubject implements Subject {
  private observers: Observer[] = [];

  public addListener(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      throw new Error("Observer has been attached already");
    }
    this.observers.push(observer);
  }

  public removeListener(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      throw new Error("Nonexistent observer");
    }
    this.observers.splice(observerIndex, 1);
  }

  public notifyListeners(): void {
    for (const observer of this.observers) {
      observer.update();
    }
  }
}
