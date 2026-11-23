import { AppError } from "../../../errors/appError.js";
import {
  HttpStatusCode,
  type HttpRequest,
  type HttpResponse,
} from "../../../interfaces/http.js";
import type { PatientDTO } from "../../../models/patient.model.js";
import type {
  IGetUserPatientsController,
  IGetUserPatientsUseCase,
} from "./protocols.js";

export class GetUserPatientsController implements IGetUserPatientsController {
  constructor(
    private readonly getUserPatientsUseCase: IGetUserPatientsUseCase,
  ) {}

  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<PatientDTO[]>> {
    const { params } = httpRequest;
    if (!params) {
      throw new AppError("Informe o ID do usuário", HttpStatusCode.BAD_REQUEST);
    }

    const patients = await this.getUserPatientsUseCase.execute({
      id: params,
    });

    return {
      body: patients,
      statusCode: 200,
    };
  }
}
