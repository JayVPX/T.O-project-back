import type { IGetUserPatientsRepository } from "../../../controllers/patients/get/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type { PatientDTO } from "../../../models/patient.model.js";

export class PostgresGetUserPatients implements IGetUserPatientsRepository {
  constructor() {}
  async getPatients(params: { id: string }): Promise<PatientDTO[]> {
    const { id } = params;
    const { rows } = await PostgresClient.query(
      `
        SELECT p.id as patient_id, p.birth_date, p.notes, p.created_at, p.name,
        pg.relationship_id, r.first_name || ' ' || r.last_name AS responsible_name, r.email, r.cellphone, r.id, r.address
        FROM public."User" r
        
        INNER JOIN public."PatientGuardian" pg 
        ON pg.responsible_id = r.id

        INNER JOIN public."Patient" p
        ON p.id = pg.patient_id

        WHERE r.id = $1
        `,
      [id],
    );

    const patients: PatientDTO[] = rows.map((p) => ({
      id: p.patient_id,
      name: p.name,
      birth_date: p.birth_date,
      relationship: p.relationship_id,
      notes: p.notes,
      created_at: p.created_at,
      responsible: {
        id: p.id,
        name: p.responsible_name,
        email: p.email,
        phone: p.cellphone,
        address: p.address,
      },
    }));

    return patients;
  }
}
