import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
import type {
  AvailabilityDTO,
  CreateAvailabilityDTO,
  RawAvailabilibyDTO,
} from "../../../models/availability.model.js";

// Create availability
export interface ICreateAvailabilityTherapistController {
  handle(
    httpRequest: HttpRequest<CreateAvailabilityDTO>,
  ): Promise<HttpResponse<AvailabilityDTO>>;
}

export interface ICreateAvailabilityTherapistUseCase {
  execute(payload: CreateAvailabilityDTO): Promise<AvailabilityDTO>;
}
export interface ICreateAvailabilityTherapistRepository {
  create(payload: CreateAvailabilityDTO): Promise<RawAvailabilibyDTO>;
}
