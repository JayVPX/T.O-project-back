import type {
  IGetUserAppointmentRepository,
  IGetUserAppointmentUseCase,
} from "../../../controllers/appointments/get/protocols.js";
import type { AppointmentDTO } from "../../../models/appointments.model.js";

export class GetUserAppointmentsUseCase implements IGetUserAppointmentUseCase {
  constructor(private readonly repository: IGetUserAppointmentRepository) {}

  async execute(params: { id: string }): Promise<AppointmentDTO[]> {
    const appointments = await this.repository.getUserAppointments(params);

    return appointments;
  }
}
