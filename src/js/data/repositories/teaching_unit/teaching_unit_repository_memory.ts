import { TeachingUnit } from "domain/models/teaching_unit";
import { TeachingUnitRepository } from "data/repositories/teaching_unit/teaching_unit_repository";

/**
 * In-memory implementation of the TeachingUnitRepository.
 * This repository stores teaching units in memory and does not persist them.
 *
 * It used for testing purposes only.
 */
export class TeachingUnitRepositoryMemory implements TeachingUnitRepository {
  private teachingUnits: TeachingUnit[] = [];

  public async getTeachingUnitsList(): Promise<TeachingUnit[]> {
    return this.teachingUnits;
  }

  public async setTeachingUnit(teaching_unit: TeachingUnit): Promise<void> {
    const index = this.teachingUnits.findIndex(
      (tu) => tu.code === teaching_unit.code,
    );
    if (index !== -1) {
      this.teachingUnits[index] = teaching_unit;
    } else {
      this.teachingUnits.push(teaching_unit);
    }
  }
}
