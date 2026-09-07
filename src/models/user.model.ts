export interface UserModelDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cellphone: string;
  role: UserRole;
}

export interface CreateUserModelDto {
  firstName: string;
  lastName: string;
  email: string;
  cellphone: string;
  password: string;
}

export type UserRole = "ADMIN" | "SA" | "USER";
