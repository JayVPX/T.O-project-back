import { AppError } from "../../../errors/appError.js";
import {
  HttpStatusCode,
  type HttpRequest,
  type HttpResponse,
} from "../../../interfaces/http.js";
import type {
  CreateAvailabilityDTO,
  AvailabilityDTO,
} from "../../../models/availability.model.js";
import type {
  ICreateAvailabilityTherapistController,
  ICreateAvailabilityTherapistUseCase,
} from "./protocols.js";

export class CreateAvailabilityController implements ICreateAvailabilityTherapistController {
  constructor(
    private readonly createAvailabilityUseCase: ICreateAvailabilityTherapistUseCase,
  ) {}

  async handle(
    httpRequest: HttpRequest<CreateAvailabilityDTO>,
  ): Promise<HttpResponse<AvailabilityDTO>> {
    const { body } = httpRequest;

    if (!body) {
      throw new AppError(
        "Insira os dados necessários",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const availability = await this.createAvailabilityUseCase.execute(body);

    return { body: availability, statusCode: HttpStatusCode.CREATED };
  }
}
