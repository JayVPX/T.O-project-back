import type { HttpResponse } from "../../../interfaces/http.js";
import type { AppointmentDTO } from "../../../models/appointments.model.js";
import type {
  IGetAllAppointmentController,
  IGetAllAppointmentUseCase,
} from "./protocols.js";

export class GetAllAppointmentController implements IGetAllAppointmentController {
  constructor(
    private readonly getAllAppointmentUseCase: IGetAllAppointmentUseCase,
  ) {}

  async handle(): Promise<HttpResponse<AppointmentDTO[]>> {
    try {
      const appointments = await this.getAllAppointmentUseCase.execute();

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
