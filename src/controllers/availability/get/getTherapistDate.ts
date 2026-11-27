import { AppError } from "../../../errors/appError.js";
import {
  HttpStatusCode,
  type HttpRequest,
  type HttpResponse,
} from "../../../interfaces/http.js";
import type { AvailabilityDTO } from "../../../models/availability.model.js";
import type {
  IGetTherapistDateAvailabilityController,
  IGetTherapistDateAvailabilityUseCase,
} from "./protocols.js";

export class GetTherapistAvailabilityDateController implements IGetTherapistDateAvailabilityController {
  constructor(
    private readonly getTherapistAvailabilityController: IGetTherapistDateAvailabilityUseCase,
  ) {}
  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<AvailabilityDTO>> {
    const { params, query } = httpRequest;

    if (!params) {
      throw new AppError(
        "Insira o ID do terapeuta",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    if (!query) {
      throw new AppError(
        "É necessário a query para seguir adiante",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const avaibility = await this.getTherapistAvailabilityController.execute({
      therapistId: params,
      date: query,
    });

    return {
      body: avaibility,
      statusCode: HttpStatusCode.OK,
    };
  }
}
