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

//GetActive
export interface IGetActiveAppointmentController {
  handle(): Promise<HttpResponse<AppointmentDTO[]>>;
}
export interface IGetActiveAppointmentUseCase {
  execute(): Promise<AppointmentDTO[]>;
}
export interface IGetActiveAppointmentRepository {
  getActive(): Promise<AppointmentDTO[]>;
}

//GetPatientAppointments
export interface IGetPatientAppointmentsController {
  handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<AppointmentDTO[]>>;
}

export interface IGetPatientAppointmentUseCase {
  execute(params: { id: string }): Promise<AppointmentDTO[]>;
}

export interface IGetPatientAppointmentRepository {
  getPatientAppointments(params: { id: string }): Promise<AppointmentDTO[]>;
}
