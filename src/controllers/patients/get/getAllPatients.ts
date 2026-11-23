import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
import type { PatientDTO } from "../../../models/patient.model.js";
import type {
  IGetAllPatientsController,
  IGetAllPatientsUseCase,
} from "./protocols.js";

export class GetAllPatientsController implements IGetAllPatientsController {
  constructor(private readonly getAllPatientUseCase: IGetAllPatientsUseCase) {}

  async handle(): Promise<HttpResponse<PatientDTO[]>> {
    const patients = await this.getAllPatientUseCase.execute();

    return {
      body: patients,
      statusCode: 200,
    };
  }
}
