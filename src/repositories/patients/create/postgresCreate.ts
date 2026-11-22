import type { ICreatePatientRepository } from "../../../controllers/patients/create/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type {
  CreatePatientDTO,
  PatientDTO,
} from "../../../models/patient.model.js";

export class PostgresCreatePatient implements ICreatePatientRepository {
  async create(params: CreatePatientDTO): Promise<PatientDTO> {
    const client = await PostgresClient.connect();

    try {
      await client.query("BEGIN");

      // 1. Criar paciente
      const { rows } = await client.query(
        `
        INSERT INTO "Patient" (name, birth_date, notes)
        VALUES ($1, $2, $3)
        RETURNING id
        `,
        [params.name, params.birth_date, params.notes],
      );

      const patientId = rows[0].id;

      // 2. Criar vínculo com responsável
      await client.query(
        `
          INSERT INTO "PatientGuardian"
          (responsible_id, patient_id, relationship_id)
          VALUES ($1, $2, $3)
        `,
        [params.responsibleId, patientId, params.relationship],
      );

      // 3. Buscar paciente criado
      const { rows: patientRows } = await client.query(
        `
          SELECT p.id, p.name, p.notes, p.birth_date, p.created_at, pg.relationship_id, r.id as responsible_id, r.email, r.cellphone,
          r.first_name || ' ' || r.last_name as responsible_name
          FROM "Patient" p

          INNER JOIN "PatientGuardian" pg 
          ON pg.patient_id = p.id
          
          INNER JOIN "User" r
          ON r.id = pg.responsible_id
          
          WHERE p.id = $1
        `,
        [patientId],
      );

      await client.query("COMMIT");

      const patient = patientRows[0];

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
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}
