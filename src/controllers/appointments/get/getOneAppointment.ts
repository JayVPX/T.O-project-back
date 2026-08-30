import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
import type { AppointmentDTO } from "../../../models/appointments.model.js";
import type {
  IGetOneAppointmentController,
  IGetOneAppointmentUseCase,
} from "./protocols.js";

export class GetOneAppointmentController implements IGetOneAppointmentController {
  constructor(private readonly getOneUseCase: IGetOneAppointmentUseCase) {}

  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<AppointmentDTO>> {
    try {
      const { params } = httpRequest;
      const appointment = await this.getOneUseCase.execute({ id: params });

      return { body: appointment, statusCode: 200 };
    } catch (error) {
      return { body: "Something went wrong", statusCode: 500 };
    }
  }
}
