import type { UserModelDto } from "./user.model.js";

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  user: UserModelDto;
  accessToken: string;
}
