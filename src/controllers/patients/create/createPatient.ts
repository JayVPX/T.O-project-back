import { AppError } from "../../../errors/appError.js";
import {
  HttpStatusCode,
  type HttpRequest,
  type HttpResponse,
} from "../../../interfaces/http.js";
import type {
  CreatePatientDTO,
  PatientDTO,
} from "../../../models/patient.model.js";
import type {
  ICreatePatientController,
  ICreatePatientUseCase,
} from "./protocols.js";

export class CreatePatientController implements ICreatePatientController {
  constructor(private readonly createPatientUseCase: ICreatePatientUseCase) {}

  async handle(
    httpRequest: HttpRequest<CreatePatientDTO>,
  ): Promise<HttpResponse<PatientDTO>> {
    const { body } = httpRequest;

    if (!body) {
      throw new AppError(
        "Preencha os dados necessários",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const patient = await this.createPatientUseCase.execute(body);

    return {
      body: patient,
      statusCode: 201,
    };
  }
}
