import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
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
    try {
      const { params } = httpRequest;
      if (!params) {
        return {
          body: "Informe o ID do usuário",
          statusCode: 400,
        };
      }

      const patients = await this.getUserPatientsUseCase.execute({
        id: params,
      });

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
