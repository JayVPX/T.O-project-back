import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
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
    try {
      const { body } = httpRequest;

      if (!body) {
        return {
          body: "Body is required.",
          statusCode: 400,
        };
      }

      const patient = await this.createPatientUseCase.execute(body);

      return {
        body: patient,
        statusCode: 201,
      };
    } catch (error) {
      return { body: "Algo deu errado tente novamente", statusCode: 500 };
    }
  }
}
