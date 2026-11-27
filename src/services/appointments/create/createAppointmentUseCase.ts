import type {
  ICreateAppointmentRepository,
  ICreateAppointmentUseCase,
} from "../../../controllers/appointments/create/protocols.js";
import type {
  CreateAppointmentDTO,
  AppointmentDTO,
} from "../../../models/appointments.model.js";
import { convertAppointmentDate } from "../../../utils/getDaysBounds.js";

export class CreateAppointmentUseCase implements ICreateAppointmentUseCase {
  constructor(
    private readonly createAppointmentRepository: ICreateAppointmentRepository,
  ) {}
  async execute(params: CreateAppointmentDTO): Promise<AppointmentDTO> {
    const { endAt: endTime, startAt: startTime, date } = params;

    const { startAt, endAt } = convertAppointmentDate({
      date,
      startTime,
      endTime,
    });

    const appointment = await this.createAppointmentRepository.create({
      date: date,
      endAt,
      startAt,
      modality: params.modality,
      patientId: params.patientId,
      therapistId: params.therapistId,
    });
    return appointment;
  }
}
