import type {
  IGetTherapistAppointmentRepository,
  IGetTherapistAppointmentUseCase,
} from "../../../controllers/appointments/get/protocols.js";
import type { AppointmentDTO } from "../../../models/appointments.model.js";

export class GetTherapistAppointmentsUseCase implements IGetTherapistAppointmentUseCase {
  constructor(
    private readonly repository: IGetTherapistAppointmentRepository,
  ) {}

  async execute(params: { id: string }): Promise<AppointmentDTO[]> {
    const appointments = await this.repository.getTherapistAppointments(params);

    return appointments;
  }
}
