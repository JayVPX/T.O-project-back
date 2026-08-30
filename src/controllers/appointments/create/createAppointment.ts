import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
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
    try {
      const { body } = httpRequest;

      if (!body) {
        return {
          body: "Body is required.",
          statusCode: 400,
        };
      }
      const appointment = await this.createAppointmentUseCase.execute(body);

      return {
        body: appointment,
        statusCode: 201,
      };
    } catch (error) {
      return { body: "Something went wrong.", statusCode: 500 };
    }
  }
}
