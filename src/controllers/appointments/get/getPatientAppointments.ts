import {
  HttpStatusCode,
  type HttpRequest,
  type HttpResponse,
} from "../../../interfaces/http.js";
import type { AppointmentDTO } from "../../../models/appointments.model.js";
import type {
  IGetPatientAppointmentsController,
  IGetPatientAppointmentUseCase,
} from "./protocols.js";

export class GetPatientAppointmentsController implements IGetPatientAppointmentsController {
  constructor(private readonly useCase: IGetPatientAppointmentUseCase) {}
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
