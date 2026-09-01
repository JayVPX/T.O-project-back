import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
import type { AppointmentDTO } from "../../../models/appointments.model.js";
import type {
  IGetUserAppointmentsController,
  IGetUserAppointmentUseCase,
} from "./protocols.js";

export class GetUserAppointmentsController implements IGetUserAppointmentsController {
  constructor(private readonly useCase: IGetUserAppointmentUseCase) {}
  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<AppointmentDTO[]>> {
    try {
      const { params } = httpRequest;
      const appointments = await this.useCase.execute({
        id: params,
      });

      return { body: appointments, statusCode: 200 };
    } catch (error) {
      return { body: "Something went wrong.", statusCode: 500 };
    }
  }
}
