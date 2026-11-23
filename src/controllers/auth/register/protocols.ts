import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
import type {
  CreateUserModelDto,
  UserModelDto,
} from "../../../models/user.model.js";

export interface IRegisterController {
  handle(
    httpRequest: HttpRequest<CreateUserModelDto>,
  ): Promise<HttpResponse<UserModelDto>>;
}

export interface IRegisterUseCase {
  execute(payload: CreateUserModelDto): Promise<UserModelDto>;
}

export interface IRegisterRepository {
  register(payload: CreateUserModelDto): Promise<UserModelDto>;
}
