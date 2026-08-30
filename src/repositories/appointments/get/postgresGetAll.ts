import type { IGetAllAppointmentRepository } from "../../../controllers/appointments/get/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type { AppointmentDTO } from "../../../models/appointments.model.js";

export class PostgresGetAllAppointment implements IGetAllAppointmentRepository {
  async getAll(): Promise<AppointmentDTO[]> {
    try {
      const { rows } = await PostgresClient.query(
        `SELECT a.id, a.date, a.user_id, u.first_name, u.last_name, u.email FROM users u 
        INNER JOIN appointments a 
        ON a.user_id = u.id
        `,
      );

      const appointments: AppointmentDTO[] = rows.map((a) => ({
        id: a.id,
        date: a.date,
        user: {
          id: a.user_id,
          name: `${a.first_name} ${a.last_name}`,
          email: a.email,
        },
      }));

      return appointments;
    } catch (error) {
      console.error("Erro no PostgreSQL: ", error);
      throw error;
    }
  }
}
