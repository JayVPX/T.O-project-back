// Retornado nos Gets
export interface AppointmentDTO {
  id: string;
  date: Date | string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

//Mandado no Post
export interface CreateAppointmentDTO {
  date: Date;
  userId: string;
}
