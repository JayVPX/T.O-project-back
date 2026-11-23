import type { IGetAllPatientsRepository } from "../../../controllers/patients/get/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type { PatientDTO } from "../../../models/patient.model.js";

export class PostgresGetAllPatients implements IGetAllPatientsRepository {
  constructor() {}
  async getAll(): Promise<PatientDTO[]> {
    const { rows } = await PostgresClient.query(
      `
         SELECT p.id, p.name, p.notes, p.birth_date, p.created_at, pg.relationship_id, r.id as responsible_id, r.email, r.cellphone,
          r.first_name || ' ' || r.last_name as responsible_name, r.address
          FROM "Patient" p

          INNER JOIN "PatientGuardian" pg 
          ON pg.patient_id = p.id
          
          INNER JOIN "User" r
          ON r.id = pg.responsible_id
        `,
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
