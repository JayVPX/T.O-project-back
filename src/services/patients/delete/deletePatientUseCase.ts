import type {
  IDeletePatientRepository,
  IDeletePatientUseCase,
} from "../../../controllers/patients/delete/protocols.js";
import type { PatientDTO } from "../../../models/patient.model.js";

export class DeletePatientUseCase implements IDeletePatientUseCase {
  constructor(
    private readonly deletePatientRepository: IDeletePatientRepository,
  ) {}
  async execute(params: { id: string }): Promise<PatientDTO> {
    const patient = await this.deletePatientRepository.delete(params);
    return patient;
  }
}
