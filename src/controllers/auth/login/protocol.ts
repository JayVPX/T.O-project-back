import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
import type {
  LoginRequestDTO,
  LoginResponseDTO,
} from "../../../models/auth.model.js";

export interface ILoginController {
  handle(
    httpRequest: HttpRequest<LoginRequestDTO>,
  ): Promise<HttpResponse<LoginResponseDTO>>;
}

export interface ILoginUseCase {
  execute(payload: LoginRequestDTO): Promise<LoginResponseDTO>;
}
