import type {
  IGetResponsibleAppointmentRepository,
  IGetResponsibleAppointmentUseCase,
} from "../../../controllers/appointments/get/protocols.js";
import type { AppointmentDTO } from "../../../models/appointments.model.js";

export class GetResponsibleAppointmentsUseCase implements IGetResponsibleAppointmentUseCase {
  constructor(
    private readonly repository: IGetResponsibleAppointmentRepository,
  ) {}

  async execute(params: { id: string }): Promise<AppointmentDTO[]> {
    const appointments =
      await this.repository.getResponsibleAppointments(params);

    return appointments;
  }
}
