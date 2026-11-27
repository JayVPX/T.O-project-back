import { AppError } from "../../../errors/appError.js";
import {
  HttpStatusCode,
  type HttpRequest,
  type HttpResponse,
} from "../../../interfaces/http.js";
import type {
  CreateAppointmentDTO,
  AppointmentDTO,
} from "../../../models/appointments.model.js";
import type {
  ICreateAppointmentController,
  ICreateAppointmentUseCase,
} from "./protocols.js";

export class CreateAppointmentController implements ICreateAppointmentController {
  constructor(
    private readonly createAppointmentUseCase: ICreateAppointmentUseCase,
  ) {}

  async handle(
    httpRequest: HttpRequest<CreateAppointmentDTO>,
  ): Promise<HttpResponse<AppointmentDTO>> {
    const { body } = httpRequest;

    if (!body) {
      throw new AppError(
        "Insira os dados necessários",
        HttpStatusCode.BAD_REQUEST,
      );
    }
    const appointment = await this.createAppointmentUseCase.execute(body);

    return {
      body: appointment,
      statusCode: HttpStatusCode.CREATED,
    };
  }
}
