import { parseISO, isValid, getISODay } from "date-fns";
import type {
  IGetTherapistDateAvailabilityRepository,
  IGetTherapistDateAvailabilityUseCase,
} from "../../../controllers/availability/get/protocols.js";
import type { AvailabilityDTO } from "../../../models/availability.model.js";
import {
  getDayBounds,
  getMinutesFromDateTime,
} from "../../../utils/getDaysBounds.js";
import type { IGetTherapistAppointmentsDateRepository } from "../../../controllers/appointments/get/protocols.js";
import {
  generateTimeSlots,
  timeToMinutes,
} from "../../../utils/scheduleSlots.js";
import { AppError } from "../../../errors/appError.js";
import { HttpStatusCode } from "../../../interfaces/http.js";

export class GetTherapistAvailabilityDateUseCase implements IGetTherapistDateAvailabilityUseCase {
  constructor(
    private readonly getTherapistAvailabilityRepository: IGetTherapistDateAvailabilityRepository,
    private readonly getTherapistAppointmentsDateRepository: IGetTherapistAppointmentsDateRepository,
  ) {}

  async execute(payload: {
    therapistId: string;
    date: string;
  }): Promise<AvailabilityDTO> {
    const { date, therapistId } = payload;

    // 1. Validar a data e descobrir o dia da semana
    const parsedDate = parseISO(date);

    if (!isValid(parsedDate) || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new AppError("Data inválida", HttpStatusCode.BAD_REQUEST);
    }

    const weekday = getISODay(parsedDate);

    // 2. Buscar as disponibilidades válidas para a data
    const availabilities =
      await this.getTherapistAvailabilityRepository.getAvailability({
        therapistId,
        weekday,
      });

    // 3. Buscar os agendamentos existentes na data
    const { startAt, endAt } = getDayBounds(date); //getDayBounds retorna o limite do dia selecionado

    const appointments =
      await this.getTherapistAppointmentsDateRepository.getAppointmentsDate({
        therapistId,
        startAt,
        endAt,
      });

    // 4. Gerar horários possíveis e remover os ocupados
    const duration = 50;
    const rest = 10;

    const slots = availabilities.flatMap((availability) => {
      const possibleSlots = generateTimeSlots(
        availability.startTime,
        availability.endTime,
        duration,
        rest,
      );

      return possibleSlots.filter((slot) => {
        const candidateStart = timeToMinutes(slot.startTime);
        const candidateEnd = timeToMinutes(slot.endTime);

        const hasConflict = appointments.some((appointment) => {
          const appointmentStart = getMinutesFromDateTime(appointment.startAt);

          const appointmentEnd = getMinutesFromDateTime(appointment.endAt);

          return (
            candidateStart < appointmentEnd && candidateEnd > appointmentStart
          );
        });

        return !hasConflict;
      });
    });

    return {
      therapistId,
      weekday,
      slots,
    };
  }
}
