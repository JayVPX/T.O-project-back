export interface UserModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  role: UserRole;
}

export interface CreateUserModel {
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  password: string;
}

export type UserRole = "ADMIN" | "SA" | "USER";
