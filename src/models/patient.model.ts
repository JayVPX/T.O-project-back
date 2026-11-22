export interface CreatePatientDTO {
  name: string;
  birth_date: string;
  relationship: number;
  notes?: string;
  responsibleId: string;
}

export interface PatientDTO {
  id: string;
  name: string;
  birth_date: string;
  created_at: string;
  relationship: number;
  responsible: {
    id: string;
    name: string;
    phone: string;
    email: string;
    address?: string;
  };
  notes?: string;
}
