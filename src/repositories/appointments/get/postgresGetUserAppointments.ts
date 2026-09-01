import type { IGetUserAppointmentRepository } from "../../../controllers/appointments/get/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type { AppointmentDTO } from "../../../models/appointments.model.js";

export class PostgresGetUserAppointments implements IGetUserAppointmentRepository {
  async getUserAppointments(params: { id: string }): Promise<AppointmentDTO[]> {
    const { rows } = await PostgresClient.query(
      `SELECT a.id, a.date, a.user_id, u.first_name, u.email, u.last_name FROM users u
            INNER JOIN appointments a 
            ON u.id = a.user_id 
            WHERE u.id = $1
            `,
      [params.id],
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
  }
}
