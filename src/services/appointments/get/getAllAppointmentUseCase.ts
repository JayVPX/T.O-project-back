import type {
  IGetAllAppointmentRepository,
  IGetAllAppointmentUseCase,
} from "../../../controllers/appointments/get/protocols.js";
import type { AppointmentDTO } from "../../../models/appointments.model.js";

export class GetAllAppointmentUseCase implements IGetAllAppointmentUseCase {
  constructor(
    private readonly getAllRepository: IGetAllAppointmentRepository,
  ) {}

  async execute(): Promise<AppointmentDTO[]> {
    const appointment = await this.getAllRepository.getAll();

    return appointment;
  }
}
