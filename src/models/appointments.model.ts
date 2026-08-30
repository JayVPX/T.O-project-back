// Retornado nos Gets
export interface AppointmentDTO {
  id: string;
  date: Date;
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
