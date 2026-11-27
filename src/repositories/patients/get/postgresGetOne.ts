import type { IGetOnePatientRepository } from "../../../controllers/patients/get/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type { PatientDTO } from "../../../models/patient.model.js";

export class PostgresGetOnePatient implements IGetOnePatientRepository {
  constructor() {}

  async getOne(params: { id: string }): Promise<PatientDTO> {
    const { id } = params;

    const { rows } = await PostgresClient.query(
      `
          SELECT p.id, p.name, p.notes, p.birth_date, p.created_at, pg.relationship_id, r.id as responsible_id, r.email, r.cellphone,
          r.first_name || ' ' || r.last_name as responsible_name, r.address
          FROM public."Patient" p

          INNER JOIN public."PatientGuardian" pg 
          ON pg.patient_id = p.id
          
          INNER JOIN public."User" r
          ON r.id = pg.responsible_id
          
          WHERE p.id = $1
        `,
      [id],
    );

    const patient = rows[0];

    return {
      id: patient.id,
      name: patient.name,
      birth_date: patient.birth_date,
      relationship: patient.relationship_id,
      notes: patient.notes,
      created_at: patient.created_at,
      responsible: {
        id: patient.responsible_id,
        name: patient.responsible_name,
        email: patient.email,
        phone: patient.cellphone,
        address: patient.address,
      },
    };
  }
}
