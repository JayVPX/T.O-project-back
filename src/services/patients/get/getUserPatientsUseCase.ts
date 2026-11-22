import type {
  IGetUserPatientsRepository,
  IGetUserPatientsUseCase,
} from "../../../controllers/patients/get/protocols.js";
import type { PatientDTO } from "../../../models/patient.model.js";

export class GetUserPatientsUseCase implements IGetUserPatientsUseCase {
  constructor(
    private readonly getUserPatientsRepository: IGetUserPatientsRepository,
  ) {}

  async execute(params: { id: string }): Promise<PatientDTO[]> {
    const patients = await this.getUserPatientsRepository.getPatients(params);
    return patients;
  }
}
