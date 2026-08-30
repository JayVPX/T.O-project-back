import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
import type { AppointmentDTO } from "../../../models/appointments.model.js";

//GetOne
export interface IGetOneAppointmentController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<AppointmentDTO>>;
}
export interface IGetOneAppointmentUseCase {
  execute(params: { id: string }): Promise<AppointmentDTO>;
}
export interface IGetOneAppointmentRepository {
  getOne(params: { id: string }): Promise<AppointmentDTO>;
}

//GetAll
export interface IGetAllAppointmentController {
  handle(): Promise<HttpResponse<AppointmentDTO[]>>;
}
export interface IGetAllAppointmentUseCase {
  execute(): Promise<AppointmentDTO[]>;
}
export interface IGetAllAppointmentRepository {
  getAll(): Promise<AppointmentDTO[]>;
}
