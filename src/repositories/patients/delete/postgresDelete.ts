import type { IDeletePatientRepository } from "../../../controllers/patients/delete/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type { PatientDTO } from "../../../models/patient.model.js";

export class PostgresDeletePatient implements IDeletePatientRepository {
  constructor() {}
  async delete(params: { id: string }): Promise<PatientDTO> {
    const client = await PostgresClient.connect();
    const { id } = params;

    try {
      await client.query("BEGIN");

      // 1. Recuperar os dados antes das exclusões
      const { rows: patientRows } = await client.query(
        `
        SELECT
          p.id,
          p.name,
          p.notes,
          p.birth_date,
          p.created_at,
          pg.relationship_id,
          r.id AS responsible_id,
          r.email,
          r.cellphone,
          r.first_name || ' ' || r.last_name AS responsible_name,
          r.address

        FROM "Patient" p

        INNER JOIN "PatientGuardian" pg
          ON pg.patient_id = p.id

        INNER JOIN "User" r
          ON r.id = pg.responsible_id

        WHERE p.id = $1
      `,
        [id],
      );

      if (!patientRows.length) {
        throw new Error("Paciente não encontrado");
      }

      const patient = patientRows[0];

      // 2. Deletar relacionamento
      await client.query(
        `
        DELETE FROM "PatientGuardian"
        WHERE patient_id = $1
      `,
        [id],
      );

      // 3. Deletar paciente
      await client.query(
        `
        DELETE FROM "Patient"
        WHERE id = $1
      `,
        [id],
      );

      await client.query("COMMIT");

      // 4. Retornar os dados do paciente recém deletado
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
