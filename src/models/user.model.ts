export interface UserModelDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  role: UserRole;
}

export interface CreateUserModelDto {
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  password: string;
}

export type UserRole = "ADMIN" | "SA" | "USER";
