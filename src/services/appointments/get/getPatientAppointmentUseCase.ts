import type {
  IGetPatientAppointmentRepository,
  IGetPatientAppointmentUseCase,
} from "../../../controllers/appointments/get/protocols.js";
import type { AppointmentDTO } from "../../../models/appointments.model.js";

export class GetPatientAppointmentsUseCase implements IGetPatientAppointmentUseCase {
  constructor(private readonly repository: IGetPatientAppointmentRepository) {}

  async execute(params: { id: string }): Promise<AppointmentDTO[]> {
    const appointments = await this.repository.getPatientAppointments(params);

    return appointments;
  }
}
