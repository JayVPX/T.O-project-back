import type {
  IGetAllPatientsRepository,
  IGetAllPatientsUseCase,
} from "../../../controllers/patients/get/protocols.js";
import type { PatientDTO } from "../../../models/patient.model.js";

export class GetAllPatientUseCase implements IGetAllPatientsUseCase {
  constructor(
    private readonly getAllPatientsRepository: IGetAllPatientsRepository,
  ) {}

  async execute(): Promise<PatientDTO[]> {
    const patients = this.getAllPatientsRepository.getAll();
    return patients;
  }
}
