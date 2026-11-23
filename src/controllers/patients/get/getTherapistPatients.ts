import { AppError } from "../../../errors/appError.js";
import {
  HttpStatusCode,
  type HttpRequest,
  type HttpResponse,
} from "../../../interfaces/http.js";
import type { PatientDTO } from "../../../models/patient.model.js";
import type {
  IGetTherapistController,
  IGetTherapistUseCase,
} from "./protocols.js";

export class GetTherapistPatientsController implements IGetTherapistController {
  constructor(private readonly getTherapistUseCase: IGetTherapistUseCase) {}
  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<PatientDTO[]>> {
    const { params } = httpRequest;

    if (!params) {
      throw new AppError(
        "Informe o ID do terapeuta",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const patients = await this.getTherapistUseCase.execute({ id: params });

    return {
      body: patients,
      statusCode: 200,
    };
  }
}
