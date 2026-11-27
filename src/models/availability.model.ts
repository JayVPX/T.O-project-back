export interface CreateAvailabilityDTO {
  therapistId: string;
  weekday: number;
  startTime: string;
  endTime: string;
}

export interface AvailabilityDTO {
  weekday: number;
  therapistId: string;
  slots: AvailabilitySlotsDTO[];
}

export interface RawAvailabilibyDTO {
  id: string;
  weekday: number;
  therapistId: string;
  startTime: string;
  endTime: string;
  updatedAt: string;
  createdAt: string;
}

export interface AvailabilitySlotsDTO {
  startTime: string;
  endTime: string;
}
