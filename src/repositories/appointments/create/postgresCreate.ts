import type { ICreateAppointmentRepository } from "../../../controllers/appointments/create/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type {
  CreateAppointmentDTO,
  AppointmentDTO,
} from "../../../models/appointments.model.js";

export class PostgresCreateAppointmentRepository implements ICreateAppointmentRepository {
  async create(params: CreateAppointmentDTO): Promise<AppointmentDTO> {
    try {
      const insertAppointment = await PostgresClient.query(
        `INSERT INTO "Appointment"(scheduled_at, patient_id, therapist_id) VALUES ($1, $2, $3) RETURNING id`,
        [params.scheduledAt, params.patientId, params.therapistId],
      );

      const appointmentId = insertAppointment.rows[0].id;

      const appointmentResult = await PostgresClient.query(
        `SELECT a.id, a.scheduled_at, a.status, p.id as patient_id, p.first_name || ' ' || p.last_name as patient_name, 
        t.id as therapist_id, t.first_name || ' ' || t.last_name as therapist_name, 
        r.id as responsible_id, r.first_name || ' ' || r.last_name as responsible_name FROM "Appointment" a

        INNER JOIN "Patient" p
        ON p.id = a.patient_id

        INNER JOIN "User" t
        ON t.id = a.therapist_id

        INNER JOIN "PatientGuardian" pg 
        ON pg.patient_id = p.id

        INNER JOIN "User" r
        ON r.id = pg.responsible_id
        
        WHERE a.id = $1
        `,
        [appointmentId],
      );

      const appointment = appointmentResult.rows[0];

      return {
        id: appointment.id,
        scheduleAt: appointment.scheduled_at,
        status: appointment.status,
        responsible: {
          id: appointment.responsible_id,
          name: appointment.responsible_name,
        },
        patient: {
          id: appointment.patient_id,
          name: appointment.patient_name,
        },
        therapist: {
          id: appointment.therapist_id,
          name: appointment.therapist_name,
        },
      };
    } catch (error) {
      console.error("Erro no PostgreSQL: ", error);
      throw error;
    }
  }
}
