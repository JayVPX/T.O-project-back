import type { IGetOneAppointmentRepository } from "../../../controllers/appointments/get/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type { AppointmentDTO } from "../../../models/appointments.model.js";

export class PostgresGetOneAppointment implements IGetOneAppointmentRepository {
  async getOne(params: { id: string }): Promise<AppointmentDTO> {
    try {
      const { id } = params;

      const { rows } = await PostgresClient.query(
        `SELECT a.id, a.date, a.user_id, u.first_name, u.email, u.last_name FROM users u 
        INNER JOIN appointments a 
        ON a.user_id = u.id
        WHERE a.id = $1
        `,
        [id],
      );

      const appointment: AppointmentDTO = {
        id: rows[0].id,
        date: rows[0].date,
        user: {
          email: rows[0].email,
          id: rows[0].user_id,
          name: `${rows[0].first_name} ${rows[0].last_name} `,
        },
      };

      return appointment;
    } catch (error) {
      console.error("Ocorreu erro no PostgreSQL: ", error);
      throw error;
    }
  }
}
