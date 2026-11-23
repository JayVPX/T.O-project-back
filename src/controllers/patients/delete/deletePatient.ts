import { AppError } from "../../../errors/appError.js";
import {
  HttpStatusCode,
  type HttpRequest,
  type HttpResponse,
} from "../../../interfaces/http.js";
import type { PatientDTO } from "../../../models/patient.model.js";
import type {
  IDeletePatientController,
  IDeletePatientUseCase,
} from "./protocols.js";

export class DeletePatientController implements IDeletePatientController {
  constructor(private readonly deletePatientUseCase: IDeletePatientUseCase) {}
  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<PatientDTO>> {
    const { params } = httpRequest;

    if (!params) {
      throw new AppError(
        "Informe o ID do paciente",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const patient = await this.deletePatientUseCase.execute({ id: params });

    return { body: patient, statusCode: 200 };
  }
}
