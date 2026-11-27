import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
import type {
  AvailabilityDTO,
  RawAvailabilibyDTO,
} from "../../../models/availability.model.js";

// Get therapist availability
export interface IGetTherapistDateAvailabilityController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<AvailabilityDTO>>;
}

export interface IGetTherapistDateAvailabilityUseCase {
  execute(payload: {
    therapistId: string;
    date: string;
  }): Promise<AvailabilityDTO>;
}

export interface IGetTherapistDateAvailabilityRepository {
  getAvailability(payload: {
    therapistId: string;
    weekday: number;
  }): Promise<RawAvailabilibyDTO[]>;
}
