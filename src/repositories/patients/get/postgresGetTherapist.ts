import type { IGetTherapistRepository } from "../../../controllers/patients/get/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type { PatientDTO } from "../../../models/patient.model.js";

export class PostgresGetTherapistPatients implements IGetTherapistRepository {
  constructor() {}

  async getPatients(params: { id: string }): Promise<PatientDTO[]> {
    const { id } = params;

    const { rows } = await PostgresClient.query(
      `
       SELECT
          p.id, p.name, p.birth_date, p.created_at, p.notes,
          pg.relationship_id,
          r.first_name || ' ' || r.last_name AS responsible_name, r.email, r.cellphone,r.id AS responsible_id,r.address
        FROM public."Patient" p

        INNER JOIN public."PatientGuardian" pg
        ON pg.patient_id = p.id

        INNER JOIN public."User" r
        ON r.id = pg.responsible_id

        WHERE EXISTS (
          SELECT 1
          FROM "Appointment" a
          WHERE a.patient_id = p.id
          AND a.therapist_id = $1
        )
        `,
      [id],
    );

    const patients: PatientDTO[] = rows.map((p) => ({
      id: p.id,
      name: p.name,
      birth_date: p.birth_date,
      relationship: p.relationship_id,
      notes: p.notes,
      created_at: p.created_at,
      responsible: {
        id: p.responsible_id,
        name: p.responsible_name,
        email: p.email,
        phone: p.cellphone,
        address: p.address,
      },
    }));

    return patients;
  }
}
