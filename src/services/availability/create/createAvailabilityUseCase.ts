import type {
  ICreateAvailabilityTherapistRepository,
  ICreateAvailabilityTherapistUseCase,
} from "../../../controllers/availability/create/protocols.js";
import type { IFindConflictAvailabilityRepository } from "../../../controllers/availability/findConflict/protocols.js";
import { AppError } from "../../../errors/appError.js";
import { HttpStatusCode } from "../../../interfaces/http.js";
import type {
  CreateAvailabilityDTO,
  AvailabilityDTO,
} from "../../../models/availability.model.js";
import { generateTimeSlots } from "../../../utils/scheduleSlots.js";

export class CreateAvailabilityUseCase implements ICreateAvailabilityTherapistUseCase {
  constructor(
    private readonly createAvailabilityRepository: ICreateAvailabilityTherapistRepository,
    private readonly findConflictAvailabilityRepository: IFindConflictAvailabilityRepository,
  ) {}

  async execute(payload: CreateAvailabilityDTO): Promise<AvailabilityDTO> {
    if (payload.startTime >= payload.endTime) {
      throw new AppError(
        "O horário de início deve ser mais cedo que o horário final",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const hasRegister =
      await this.findConflictAvailabilityRepository.find(payload);

    if (hasRegister) {
      throw new AppError("Esse horário é inválido", HttpStatusCode.CONFLICT);
    }

    const rawAvailability =
      await this.createAvailabilityRepository.create(payload);

    const { startTime, endTime } = rawAvailability;

    const slots = generateTimeSlots(startTime, endTime, 50, 10);

    const availability: AvailabilityDTO = {
      therapistId: rawAvailability.therapistId,
      weekday: rawAvailability.weekday,
      slots: slots,
    };

    return availability;
  }
}
