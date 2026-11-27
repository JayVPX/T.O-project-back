import { HttpStatusCode, type HttpResponse } from "../../../interfaces/http.js";
import type { AppointmentDTO } from "../../../models/appointments.model.js";
import type {
  IGetActiveAppointmentController,
  IGetActiveAppointmentUseCase,
} from "./protocols.js";

export class GetActiveAppointmentController implements IGetActiveAppointmentController {
  constructor(
    private readonly getActiveAppointmentUseCase: IGetActiveAppointmentUseCase,
  ) {}

  async handle(): Promise<HttpResponse<AppointmentDTO[]>> {
    const appointments = await this.getActiveAppointmentUseCase.execute();

    return {
      body: appointments,
      statusCode: HttpStatusCode.OK,
    };
  }
}
