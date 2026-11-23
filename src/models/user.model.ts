export interface UserModelDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  role: UserRole;
  address?: string | undefined;
}

export interface CreateUserModelDto {
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
}

export interface UserAuthDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  role: UserRole;
  address?: string;
  hashPassword: string;
}

export type UserRole = "ADMIN" | "SA" | "USER";
