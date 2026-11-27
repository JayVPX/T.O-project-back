import type { IFindConflictAvailabilityRepository } from "../../../controllers/availability/findConflict/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type { CreateAvailabilityDTO } from "../../../models/availability.model.js";

export class PostgresFindAvailabilityConflict implements IFindConflictAvailabilityRepository {
  async find(payload: CreateAvailabilityDTO): Promise<boolean> {
    const { therapistId, weekday, startTime, endTime } = payload;

    const { rows } = await PostgresClient.query(
      `
        SELECT 1
        FROM "TherapistSchedule"
        WHERE therapist_id = $1
          AND weekday = $2

          AND start_time < $4
          AND end_time > $3

        LIMIT 1;
      `,
      [therapistId, weekday, startTime, endTime],
    );

    return rows.length > 0;
  }
}
