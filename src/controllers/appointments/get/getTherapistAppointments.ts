import {
  HttpStatusCode,
  type HttpRequest,
  type HttpResponse,
} from "../../../interfaces/http.js";
import type { AppointmentDTO } from "../../../models/appointments.model.js";
import type {
  IGetTherapistAppointmentsController,
  IGetTherapistAppointmentUseCase,
} from "./protocols.js";

export class GetTherapistAppointmentsController implements IGetTherapistAppointmentsController {
  constructor(private readonly useCase: IGetTherapistAppointmentUseCase) {}
  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<AppointmentDTO[]>> {
    const { params } = httpRequest;
    const appointments = await this.useCase.execute({
      id: params,
    });

    return { body: appointments, statusCode: HttpStatusCode.OK };
  }
}
