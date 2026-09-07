// Retornado nos Gets
export interface AppointmentDTO {
  id: string;
  scheduleAt: Date | string;
  status: AppointmentStatus;
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
}

//Mandado no Post
export interface CreateAppointmentDTO {
  patientId: string;
  therapistId: string;
  scheduledAt: Date;
}

export type AppointmentStatus = "CREATED" | "SCHEDULED";
