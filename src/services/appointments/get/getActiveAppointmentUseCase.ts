import type {
  IGetActiveAppointmentRepository,
  IGetActiveAppointmentUseCase,
} from "../../../controllers/appointments/get/protocols.js";
import type { AppointmentDTO } from "../../../models/appointments.model.js";

export class GetActiveAppointmentUseCase implements IGetActiveAppointmentUseCase {
  constructor(
    private readonly getActiveRepository: IGetActiveAppointmentRepository,
  ) {}

  async execute(): Promise<AppointmentDTO[]> {
    const appointments = await this.getActiveRepository.getActive();

    return appointments;
  }
}
