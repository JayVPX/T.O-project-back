import type {
  IGetOnePatientRepository,
  IGetOnePatientUseCase,
} from "../../../controllers/patients/get/protocols.js";
import type { PatientDTO } from "../../../models/patient.model.js";

export class GetOnePatientUseCase implements IGetOnePatientUseCase {
  constructor(
    private readonly getOnePatientRepository: IGetOnePatientRepository,
  ) {}

  async execute(params: { id: string }): Promise<PatientDTO> {
    const patient = await this.getOnePatientRepository.getOne(params);
    return patient;
  }
}
