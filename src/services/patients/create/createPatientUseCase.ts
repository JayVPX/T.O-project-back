import type {
  ICreatePatientRepository,
  ICreatePatientUseCase,
} from "../../../controllers/patients/create/protocols.js";
import type {
  CreatePatientDTO,
  PatientDTO,
} from "../../../models/patient.model.js";

export class CreatePatientUseCase implements ICreatePatientUseCase {
  constructor(
    private readonly createPatientRepository: ICreatePatientRepository,
  ) {}

  async execute(params: CreatePatientDTO): Promise<PatientDTO> {
    const patient = await this.createPatientRepository.create(params);

    return patient;
  }
}
