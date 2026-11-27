import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
import type {
  AppointmentAvailabilityDTO,
  AppointmentDTO,
} from "../../../models/appointments.model.js";

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

// GetResponsibleAppointments
export interface IGetResponsibleAppointmentsController {
  handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<AppointmentDTO[]>>;
}

export interface IGetResponsibleAppointmentUseCase {
  execute(params: { id: string }): Promise<AppointmentDTO[]>;
}

export interface IGetResponsibleAppointmentRepository {
  getResponsibleAppointments(params: { id: string }): Promise<AppointmentDTO[]>;
}

// GetTherapistAppointments
export interface IGetTherapistAppointmentsController {
  handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<AppointmentDTO[]>>;
}

export interface IGetTherapistAppointmentUseCase {
  execute(params: { id: string }): Promise<AppointmentDTO[]>;
}

export interface IGetTherapistAppointmentRepository {
  getTherapistAppointments(params: { id: string }): Promise<AppointmentDTO[]>;
}

// GetTherapistAppointmentsDate (Para pegar qualquer appointment em um dia, para filtrar os horários)
export interface IGetTherapistAppointmentsDateRepository {
  getAppointmentsDate(payload: {
    therapistId: string;
    startAt: string;
    endAt: string;
  }): Promise<AppointmentAvailabilityDTO[]>;
}
