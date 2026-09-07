import type { HttpResponse } from "../../../interfaces/http.js";
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
    try {
      const appointments = await this.getActiveAppointmentUseCase.execute();

      return {
        body: appointments,
        statusCode: 200,
      };
    } catch (error) {
      return {
        body: "Something went wrong.",
        statusCode: 500,
      };
    }
  }
}
