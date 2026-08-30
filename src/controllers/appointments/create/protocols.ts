import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
import type {
  AppointmentDTO,
  CreateAppointmentDTO,
} from "../../../models/appointments.model.js";

export interface ICreateAppointmentController {
  handle(
    httpRequest: HttpRequest<CreateAppointmentDTO>,
  ): Promise<HttpResponse<AppointmentDTO>>;
}

export interface ICreateAppointmentUseCase {
  execute(params: CreateAppointmentDTO): Promise<AppointmentDTO>;
}

export interface ICreateAppointmentRepository {
  create(params: CreateAppointmentDTO): Promise<AppointmentDTO>;
}
