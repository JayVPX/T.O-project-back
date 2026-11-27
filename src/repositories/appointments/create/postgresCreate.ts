import type { ICreateAppointmentRepository } from "../../../controllers/appointments/create/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type {
  CreateAppointmentDTO,
  AppointmentDTO,
} from "../../../models/appointments.model.js";

export class PostgresCreateAppointmentRepository implements ICreateAppointmentRepository {
  async create(payload: CreateAppointmentDTO): Promise<AppointmentDTO> {
    const client = await PostgresClient.connect();
    try {
      const { endAt, modality, patientId, startAt, therapistId } = payload;

      await client.query(`BEGIN`);

      const insertAppointment = await client.query(
        `INSERT INTO "Appointment"(start_at, end_at, modality, patient_id, therapist_id) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [startAt, endAt, modality, patientId, therapistId],
      );

      const appointmentId = insertAppointment.rows[0].id;

      const appointmentResult = await client.query(
        `SELECT a.id, a.status, a.created_at, a.updated_at, a.start_at, a.end_at, a.modality, a.notes,
        p.id as patient_id, p.name as patient_name, 
        t.id as therapist_id, t.first_name || ' ' || t.last_name as therapist_name, 
        r.id as responsible_id, r.first_name || ' ' || r.last_name as responsible_name FROM public."Appointment" a

        INNER JOIN public."Patient" p
        ON p.id = a.patient_id

        INNER JOIN public."User" t
        ON t.id = a.therapist_id

        INNER JOIN public."PatientGuardian" pg 
        ON pg.patient_id = p.id

        INNER JOIN public."User" r
        ON r.id = pg.responsible_id
        
        WHERE a.id = $1
        `,
        [appointmentId],
      );

      const appointment = appointmentResult.rows[0];

      await client.query(`COMMIT`);

      return {
        id: appointment.id,
        startAt: appointment.start_at,
        endAt: appointment.end_at,
        modality: appointment.modality,
        status: appointment.status,
        notes: appointment.notes,
        createdAt: appointment.created_at,
        updatedAt: appointment.updated_at,
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
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}
