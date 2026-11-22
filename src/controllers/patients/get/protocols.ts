import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
import type { PatientDTO } from "../../../models/patient.model.js";

// GetOne Interfaces
export interface IGetOnePatientController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<PatientDTO>>;
}

export interface IGetOnePatientUseCase {
  execute(params: { id: string }): Promise<PatientDTO>;
}

export interface IGetOnePatientRepository {
  getOne(params: { id: string }): Promise<PatientDTO>;
}

// GetAll Interfaces
export interface IGetAllPatientsController {
  handle(): Promise<HttpResponse<PatientDTO[]>>;
}

export interface IGetAllPatientsUseCase {
  execute(): Promise<PatientDTO[]>;
}

export interface IGetAllPatientsRepository {
  getAll(): Promise<PatientDTO[]>;
}

// GetUser Interfaces
export interface IGetUserPatientsController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<PatientDTO[]>>;
}

export interface IGetUserPatientsUseCase {
  execute(params: { id: string }): Promise<PatientDTO[]>;
}

export interface IGetUserPatientsRepository {
  getPatients(params: { id: string }): Promise<PatientDTO[]>;
}

// GetTherapist Interfaces

export interface IGetTherapistController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<PatientDTO[]>>;
}

export interface IGetTherapistUseCase {
  execute(params: { id: string }): Promise<PatientDTO[]>;
}

export interface IGetTherapistRepository {
  getPatients(params: { id: string }): Promise<PatientDTO[]>;
}
