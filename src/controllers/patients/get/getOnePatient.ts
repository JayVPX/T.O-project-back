import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
import type { PatientDTO } from "../../../models/patient.model.js";
import type {
  IGetOnePatientController,
  IGetOnePatientUseCase,
} from "./protocols.js";

export class GetOnePatientController implements IGetOnePatientController {
  constructor(private readonly getOnePatientUseCase: IGetOnePatientUseCase) {}
  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<PatientDTO>> {
    try {
      const { params } = httpRequest;

      if (!params) {
        return { body: "Informe o ID do paciente", statusCode: 400 };
      }

      const patient = await this.getOnePatientUseCase.execute({ id: params });

      return {
        body: patient,
        statusCode: 200,
      };
    } catch (error) {
      console.error("Ocorreu um erro na requisição: ", error);
      return {
        body: "Algo deu errado, tente novamente",
        statusCode: 500,
      };
    }
  }
}
