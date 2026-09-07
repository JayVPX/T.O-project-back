import type { IGetOneAppointmentRepository } from "../../../controllers/appointments/get/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type { AppointmentDTO } from "../../../models/appointments.model.js";

export class PostgresGetOneAppointment implements IGetOneAppointmentRepository {
  async getOne(params: { id: string }): Promise<AppointmentDTO> {
    try {
      const { id } = params;

      const { rows } = await PostgresClient.query(
        `SELECT a.id, a.scheduled_at, a.status, 
        p.id as patient_id, p.first_name || ' ' || p.last_name as patient_name,
        r.id as responsible_id, r.first_name || ' ' || r.last_name as responsible_name,
        t.id as therapist_id, t.first_name || ' ' || t.last_name as therapist_name FROM "Appointment" a

        INNER JOIN "Patient" p ON p.id = a.patient_id
        INNER JOIN "User" t ON  t.id = a.therapist_id
        INNER JOIN "PatientGuardian" pg ON pg.patient_id = p.id
        INNER JOIN "User" r ON  r.id = pg.responsible_id

        WHERE a.status NOT IN ('CANCELLED') 
        AND a.id = $1
        `,
        [id],
      );

      const appointResult = rows[0];

      const appointment: AppointmentDTO = {
        id: appointResult.id,
        scheduleAt: appointResult.scheduled_at,
        status: appointResult.status,
        responsible: {
          id: appointResult.responsible_id,
          name: appointResult.responsible_name,
        },
        patient: {
          id: appointResult.patient_id,
          name: appointResult.patient_name,
        },
        therapist: {
          id: appointResult.therapist_id,
          name: appointResult.therapist_name,
        },
      };

      return appointment;
    } catch (error) {
      console.error("Ocorreu erro no PostgreSQL: ", error);
      throw error;
    }
  }
}
