import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
import type {
  CreateUserModelDto,
  UserModelDto,
} from "../../../models/user.model.js";

export interface ICreateSaController {
  handle(
    httpRequest: HttpRequest<CreateUserModelDto>,
  ): Promise<HttpResponse<UserModelDto>>;
}

export interface ICreateSaRepository {
  register(params: CreateUserModelDto): Promise<UserModelDto>;
}
