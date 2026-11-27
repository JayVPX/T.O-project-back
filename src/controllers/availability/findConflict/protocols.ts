import type { CreateAvailabilityDTO } from "../../../models/availability.model.js";

export interface IFindConflictAvailabilityRepository {
  find(payload: CreateAvailabilityDTO): Promise<boolean>;
}
