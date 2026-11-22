import type {
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
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
    try {
      const { params } = httpRequest;

      if (!params) {
        return { body: "Informe o ID do paciente", statusCode: 400 };
      }

      const patient = await this.deletePatientUseCase.execute({ id: params });

      return { body: patient, statusCode: 200 };
    } catch (error) {
      console.error("Erro durante a exclusão: ", error);
      return {
        body: "Algo deu errado, tente novamente",
        statusCode: 500,
      };
    }
  }
}
