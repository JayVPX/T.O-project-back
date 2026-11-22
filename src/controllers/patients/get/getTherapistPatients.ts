import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
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
    try {
      const { params } = httpRequest;

      if (!params) {
        return {
          body: "Informe o ID do terapeuta",
          statusCode: 400,
        };
      }

      const patients = await this.getTherapistUseCase.execute({ id: params });

      return {
        body: patients,
        statusCode: 200,
      };
    } catch (error) {
      console.error("Ocorreu um erro: ", error);
      return {
        body: "Algo deu errado, tente novamente",
        statusCode: 500,
      };
    }
  }
}
