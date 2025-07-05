import { TeachingUnit } from "domain/models/teaching_unit";
import { AbstractSubject } from "utils/observer";
import { TeachingUnitRepository } from "data/repositories/teaching_unit/teaching_unit_repository";
import { State } from "domain/models/state";

export class TeachingUnitViewModel extends AbstractSubject {
  private repository: TeachingUnitRepository;

  public teachingUnits: TeachingUnit[];
  public ready: Promise<null>;

  constructor(repository: TeachingUnitRepository) {
    super();

    this.repository = repository;
    this.ready = new Promise((resolve) => {
      this.repository.getTeachingUnitsList().then((teachingUnits) => {
        this.teachingUnits = teachingUnits;
        resolve(null);
      });
    });
  }

  public getTeachingUnit(code: string): TeachingUnit | null {
    const teachingUnit = this.teachingUnits.find((tu) => tu.code === code);
    if (!teachingUnit) {
      return null;
    }
    return teachingUnit;
  }

  public getECTSCount(): number {
    return this.teachingUnits.reduce((total, tu) => {
      if (tu.state === State.Validated) {
        return total + (tu.ects || 0);
      }
      return total;
    }, 0);
  }

  public filterTeachingUnitByCenter(center: string) {
    for (const teachingUnit of this.teachingUnits) {
      const centers = teachingUnit.teachingCenters;
      if (!centers || !center || centers.includes(center)) {
        teachingUnit.isEnabled = true;
      } else {
        teachingUnit.isEnabled = false;
      }
    }

    this.notifyListeners();
  }

  public toggleTeachingUnit(code: string): void {
    const teachingUnit = this.getTeachingUnit(code);
    switch (teachingUnit.state) {
      case State.Unselected:
        teachingUnit.state = State.Selected;
        this.repository.setTeachingUnit(teachingUnit);
        break;
      case State.Selected:
        teachingUnit.state = State.Validated;
        this.repository.setTeachingUnit(teachingUnit);
        break;
      case State.Validated:
        teachingUnit.state = State.Unselected;
        this.repository.setTeachingUnit(teachingUnit);
        break;
    }

    // TODO: Avoid updating all listeners when only one teaching unit changes.
    this.notifyListeners();
  }
}
