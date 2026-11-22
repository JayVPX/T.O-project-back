import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
import type { PatientDTO } from "../../../models/patient.model.js";

export interface IDeletePatientController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<PatientDTO>>;
}

export interface IDeletePatientUseCase {
  execute(params: { id: string }): Promise<PatientDTO>;
}

export interface IDeletePatientRepository {
  delete(params: { id: string }): Promise<PatientDTO>;
}
