import { DOMService } from "data/services/dom_service";
import { State } from "domain/models/state";
import { TeachingUnit } from "domain/models/teaching_unit";
import { TeachingUnitRepository } from "data/repositories/teaching_unit/teaching_unit_repository";
import browser from "webextension-polyfill";

export class TeachingUnitRepositoryLocal implements TeachingUnitRepository {
  private isInitialized: boolean = false;
  private domService: DOMService;
  teachingUnits: TeachingUnit[] = [];

  constructor(service: DOMService) {
    this.domService = service;
  }

  public async getTeachingUnitsList(): Promise<TeachingUnit[]> {
    if (!this.isInitialized) {
      await this.createDefaultTeachingUnits();
      this.isInitialized = true;
    }
    return this.teachingUnits;
  }

  public async setTeachingUnit(teaching_unit: TeachingUnit) {
    await browser.storage.local.set({
      [teaching_unit.code]: teaching_unit.state,
    });
  }

  private async createDefaultTeachingUnits() {
    if (this.teachingUnits.length === 0) {
      const teachingUnitElements = this.domService.getTeachingUnitElements();
      for (const el of teachingUnitElements) {
        try {
          const tu = TeachingUnit.fromElement(el as HTMLElement);
          const record = await browser.storage.local.get(tu.code);
          const state = <State>record[tu.code];
          tu.state = state ? state : State.Unselected;
          this.teachingUnits.push(tu);
        } catch (error) {
          console.warn(`Failed to add teaching unit ${el}: ${error}`);
        }
      }
    }
  }
}
