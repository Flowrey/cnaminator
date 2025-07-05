import { TeachingUnit } from "domain/models/teaching_unit";

export interface TeachingUnitRepository {
  getTeachingUnitsList(): Promise<TeachingUnit[]>;
  setTeachingUnit(teaching_unit: TeachingUnit): Promise<void>;
}
