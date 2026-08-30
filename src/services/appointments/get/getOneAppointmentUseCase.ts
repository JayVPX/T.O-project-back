import type {
  IGetAllAppointmentRepository,
  IGetOneAppointmentRepository,
  IGetOneAppointmentUseCase,
} from "../../../controllers/appointments/get/protocols.js";
import type { AppointmentDTO } from "../../../models/appointments.model.js";

export class GetOneAppointmentUseCase implements IGetOneAppointmentUseCase {
  constructor(
    private readonly getOneRepository: IGetOneAppointmentRepository,
  ) {}
  async execute(params: { id: string }): Promise<AppointmentDTO> {
    const appointment = await this.getOneRepository.getOne(params);
    return appointment;
  }
}
