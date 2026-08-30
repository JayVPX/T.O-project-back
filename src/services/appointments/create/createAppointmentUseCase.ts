import type {
  ICreateAppointmentRepository,
  ICreateAppointmentUseCase,
} from "../../../controllers/appointments/create/protocols.js";
import type {
  CreateAppointmentDTO,
  AppointmentDTO,
} from "../../../models/appointments.model.js";

export class CreateAppointmentUseCase implements ICreateAppointmentUseCase {
  constructor(
    private readonly createAppointmentRepository: ICreateAppointmentRepository,
  ) {}
  async execute(params: CreateAppointmentDTO): Promise<AppointmentDTO> {
    const appointment = await this.createAppointmentRepository.create(params);

    return appointment;
  }
}
