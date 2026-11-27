import type { IGetTherapistAppointmentsDateRepository } from "../../../controllers/appointments/get/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type { AppointmentAvailabilityDTO } from "../../../models/appointments.model.js";

export class PostgresGetTherapistAppointmentsDate implements IGetTherapistAppointmentsDateRepository {
  async getAppointmentsDate(payload: {
    therapistId: string;
    startAt: string;
    endAt: string;
  }): Promise<AppointmentAvailabilityDTO[]> {
    const { therapistId, startAt, endAt } = payload;

    const { rows } = await PostgresClient.query(
      `
        SELECT
          start_at AS "startAt",
          end_at AS "endAt"
        FROM public."Appointment"
        WHERE therapist_id = $1
          AND start_at < $3
          AND end_at > $2
          AND status IN ('SCHEDULED', 'CONFIRMED')
        ORDER BY start_at ASC;
      `,
      [therapistId, startAt, endAt],
    );

    return rows;
  }
}
