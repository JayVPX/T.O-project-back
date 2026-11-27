import { formatInTimeZone, fromZonedTime, toZonedTime } from "date-fns-tz";
import { addDays, format, parseISO } from "date-fns";
import { AppError } from "../errors/appError.js";
import { HttpStatusCode } from "../interfaces/http.js";

const CLINIC_TIMEZONE = "America/Recife";
interface AppointmentDatePayload {
  date: string;
  startTime: string;
  endTime: string;
}

// Função para receber estabelecer um intervalo de datas (meia noite até meia noite) para filtrar no getTherapistDate
export function getDayBounds(date: string) {
  const startAt = fromZonedTime(`${date}T00:00:00`, CLINIC_TIMEZONE);

  const nextDay = addDays(parseISO(date), 1);

  const endAt = fromZonedTime(
    `${format(nextDay, "yyyy-MM-dd")}T00:00:00`,
    CLINIC_TIMEZONE,
  );

  return {
    startAt: startAt.toISOString(),
    endAt: endAt.toISOString(),
  };
}

// Função para transformar date no timezone local (Recife)
export function getTimeFromDateTime(dateTime: string): string {
  return formatInTimeZone(new Date(dateTime), CLINIC_TIMEZONE, "HH:mm");
}

export function getMinutesFromDateTime(dateTime: string): number {
  const time = formatInTimeZone(new Date(dateTime), CLINIC_TIMEZONE, "HH:mm");

  const [hours = 0, minutes = 0] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

// Função para receber os horários e as datas do front e retornar em ISO (CreateAppointment)
export function convertAppointmentDate(payload: AppointmentDatePayload) {
  const { date, startTime, endTime } = payload;

  const startAt = fromZonedTime(`${date}T${startTime}:00`, CLINIC_TIMEZONE);

  const endAt = fromZonedTime(`${date}T${endTime}:00`, CLINIC_TIMEZONE);

  if (endAt <= startAt) {
    throw new AppError(
      "Horário de consulta é inválido",
      HttpStatusCode.BAD_REQUEST,
    );
  }

  return {
    startAt: startAt.toISOString(),
    endAt: endAt.toISOString(),
  };
}
