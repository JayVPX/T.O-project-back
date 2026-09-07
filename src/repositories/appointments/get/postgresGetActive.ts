import type { IGetActiveAppointmentRepository } from "../../../controllers/appointments/get/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type { AppointmentDTO } from "../../../models/appointments.model.js";

export class PostgresGetActiveAppointment implements IGetActiveAppointmentRepository {
  async getActive(): Promise<AppointmentDTO[]> {
    try {
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
        `,
      );

      const appointments: AppointmentDTO[] = rows.map((a) => ({
        id: a.id,
        scheduleAt: a.scheduled_at,
        status: a.status,
        responsible: {
          id: a.responsible_id,
          name: a.responsible_name,
        },
        patient: {
          id: a.patient_id,
          name: a.patient_name,
        },
        therapist: {
          id: a.therapist_id,
          name: a.therapist_name,
        },
      }));

      return appointments;
    } catch (error) {
      console.error("Erro no PostgreSQL: ", error);
      throw error;
    }
  }
}
