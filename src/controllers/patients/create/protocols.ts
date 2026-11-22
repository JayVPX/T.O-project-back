import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
import type {
  CreatePatientDTO,
  PatientDTO,
} from "../../../models/patient.model.js";

export interface ICreatePatientController {
  handle(
    httpRequest: HttpRequest<CreatePatientDTO>,
  ): Promise<HttpResponse<PatientDTO>>;
}

export interface ICreatePatientUseCase {
  execute(params: CreatePatientDTO): Promise<PatientDTO>;
}

export interface ICreatePatientRepository {
  create(params: CreatePatientDTO): Promise<PatientDTO>;
}
