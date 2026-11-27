import type { IGetTherapistDateAvailabilityRepository } from "../../../controllers/availability/get/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type { RawAvailabilibyDTO } from "../../../models/availability.model.js";

export class PostgresTherapistDateAvailability implements IGetTherapistDateAvailabilityRepository {
  async getAvailability(payload: {
    therapistId: string;
    weekday: number;
  }): Promise<RawAvailabilibyDTO[]> {
    const { therapistId, weekday } = payload;
    const { rows } = await PostgresClient.query(
      `
      SELECT id, therapist_id, weekday, start_time, end_time, created_at, updated_at 
      FROM "TherapistSchedule"

      WHERE therapist_id = $1 AND weekday = $2
      
      ORDER BY start_time ASC
      `,
      [therapistId, weekday],
    );

    const availabilities: RawAvailabilibyDTO[] = rows.map((a) => ({
      id: a.id,
      therapistId: a.therapist_id,
      weekday: a.weekday,
      startTime: a.start_time,
      endTime: a.end_time,
      createdAt: a.created_at,
      updatedAt: a.updated_at,
    }));

    return availabilities;
  }
}
