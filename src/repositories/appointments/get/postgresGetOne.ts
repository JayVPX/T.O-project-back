import type { IGetOneAppointmentRepository } from "../../../controllers/appointments/get/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type { AppointmentDTO } from "../../../models/appointments.model.js";

export class PostgresGetOneAppointment implements IGetOneAppointmentRepository {
  async getOne(params: { id: string }): Promise<AppointmentDTO> {
    const { id } = params;

    const { rows } = await PostgresClient.query(
      `SELECT a.id, a.status, a.created_at, a.updated_at, a.start_at, a.end_at, a.modality, a.notes,
        p.id as patient_id, p.name as patient_name,
        r.id as responsible_id, r.first_name || ' ' || r.last_name as responsible_name,
        t.id as therapist_id, t.first_name || ' ' || t.last_name as therapist_name FROM public."Appointment" a

        INNER JOIN public."Patient" p ON p.id = a.patient_id
        INNER JOIN public."User" t ON  t.id = a.therapist_id
        INNER JOIN public."PatientGuardian" pg ON pg.patient_id = p.id
        INNER JOIN public."User" r ON  r.id = pg.responsible_id

        WHERE a.id = $1
        `,
      [id],
    );

    const appointResult = rows[0];

    const appointment: AppointmentDTO = {
      id: appointResult.id,
      startAt: appointResult.start_at,
      endAt: appointResult.end_at,
      modality: appointResult.modality,
      status: appointResult.status,
      notes: appointResult.notes,
      createdAt: appointResult.created_at,
      updatedAt: appointResult.updated_at,
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
  }
}
