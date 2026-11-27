import type { IGetResponsibleAppointmentRepository } from "../../../controllers/appointments/get/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type { AppointmentDTO } from "../../../models/appointments.model.js";

export class PostgresGetResponsibleAppointments implements IGetResponsibleAppointmentRepository {
  constructor() {}
  async getResponsibleAppointments(params: {
    id: string;
  }): Promise<AppointmentDTO[]> {
    const { id } = params;

    const { rows } = await PostgresClient.query(
      `
        SELECT 
        a.id, a.status, a.created_at, a.updated_at, a.start_at, a.end_at, a.modality, a.notes,
        p.id as patient_id, p.name as patient_name,
        r.id as responsible_id, r.first_name || ' ' || r.last_name as responsible_name,
        t.id as therapist_id, t.first_name || ' ' || t.last_name as therapist_name 
        FROM "Appointment" a
        
        INNER JOIN "Patient" p ON p.id = a.patient_id
        INNER JOIN "User" t ON  t.id = a.therapist_id
        INNER JOIN "PatientGuardian" pg ON pg.patient_id = p.id
        INNER JOIN "User" r ON  r.id = pg.responsible_id
        
        WHERE r.id = $1
        ORDER BY start_at ASC;
        `,
      [id],
    );

    const appointments: AppointmentDTO[] = rows.map((a) => ({
      id: a.id,
      startAt: a.start_at,
      endAt: a.end_at,
      modality: a.modality,
      status: a.status,
      notes: a.notes,
      createdAt: a.created_at,
      updatedAt: a.updated_at,
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
  }
}
