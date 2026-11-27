// Retornado nos Gets
export interface AppointmentDTO {
  id: string;
  startAt: string;
  endAt: string;
  status: AppointmentStatus;
  modality: AppointmentModality;
  notes?: string;
  responsible: {
    id: string;
    name: string;
  };
  patient: {
    id: string;
    name: string;
  };
  therapist: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

//Mandado no Post
export interface CreateAppointmentDTO {
  patientId: string;
  therapistId: string;
  startAt: string;
  endAt: string;
  date: string;
  modality: string;
  address?: string;
}

// Usado no GetTherapistAppointmentDate,
export interface AppointmentAvailabilityDTO {
  startAt: string;
  endAt: string;
}

export type AppointmentModality = "ONLINE" | "PRESENCIAL";

export type AppointmentStatus =
  | "CREATED"
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";
