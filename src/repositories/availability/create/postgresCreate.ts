import type { ICreateAvailabilityTherapistRepository } from "../../../controllers/availability/create/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type {
  CreateAvailabilityDTO,
  AvailabilityDTO,
  RawAvailabilibyDTO,
} from "../../../models/availability.model.js";

export class PostgresCreateAvailability implements ICreateAvailabilityTherapistRepository {
  constructor() {}
  async create(payload: CreateAvailabilityDTO): Promise<RawAvailabilibyDTO> {
    const { endTime, startTime, therapistId, weekday } = payload;

    const { rows } = await PostgresClient.query(
      `
        INSERT INTO public."TherapistSchedule" (
          therapist_id,
          weekday,
          start_time,
          end_time
        )
        VALUES ($1, $2, $3, $4)
        RETURNING
          id,
          therapist_id,
          weekday,
          start_time,
          end_time,
          created_at,
          updated_at;
        `,
      [therapistId, weekday, startTime, endTime],
    );

    const availability = rows[0];

    return {
      id: availability.id,
      therapistId: availability.id,
      weekday: availability.weekday,
      startTime: availability.start_time,
      endTime: availability.end_time,
      createdAt: availability.created_at,
      updatedAt: availability.updated_at,
    };
  }
}
