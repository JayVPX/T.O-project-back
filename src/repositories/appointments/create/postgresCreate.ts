import type { ICreateAppointmentRepository } from "../../../controllers/appointments/create/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type {
  CreateAppointmentDTO,
  AppointmentDTO,
} from "../../../models/appointments.model.js";

export class PostgresCreateAppointmentRepository implements ICreateAppointmentRepository {
  async create(params: CreateAppointmentDTO): Promise<AppointmentDTO> {
    try {
      const insertAppointment = await PostgresClient.query(
        `INSERT INTO appointments(date, user_id) VALUES ($1, $2) RETURNING id`,
        [params.date, params.userId],
      );

      const appointmentId = insertAppointment.rows[0].id;

      const appointmentResult = await PostgresClient.query(
        `SELECT u.first_name, u.last_name, u.email, a.date, a.user_id, a.id FROM appointments a
        INNER JOIN users u
        ON u.id = a.user_id
        WHERE a.id = $1
        `,
        [appointmentId],
      );

      const appointment = appointmentResult.rows[0];

      return {
        id: appointment.id,
        date: appointment.date,
        user: {
          id: appointment.user_id,
          name: `${appointment.first_name} ${appointment.last_name}`,
          email: appointment.email,
        },
      };
    } catch (error) {
      console.error("Erro no PostgreSQL: ", error);
      throw error;
    }
  }
}
