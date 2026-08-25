import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
import type { CreateUserModel, UserModel } from "../../../models/user.model.js";

export interface ICreateSaController {
  handle(
    httpRequest: HttpRequest<CreateUserModel>,
  ): Promise<HttpResponse<UserModel>>;
}

export interface ICreateSaRepository {
  register(params: CreateUserModel): Promise<UserModel>;
}
