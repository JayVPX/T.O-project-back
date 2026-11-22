import type {
  IGetTherapistRepository,
  IGetTherapistUseCase,
} from "../../../controllers/patients/get/protocols.js";
import type { PatientDTO } from "../../../models/patient.model.js";

export class GetTherapistUseCase implements IGetTherapistUseCase {
  constructor(
    private readonly getTherapistRepository: IGetTherapistRepository,
  ) {}

  async execute(params: { id: string }): Promise<PatientDTO[]> {
    const patients = await this.getTherapistRepository.getPatients(params);
    return patients;
  }
}
