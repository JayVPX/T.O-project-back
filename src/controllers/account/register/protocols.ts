import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
import type { CreateUserModel, UserModel } from "../../../models/user.model.js";

export interface IRegisterController {
  handle(
    httpRequest: HttpRequest<CreateUserModel>,
  ): Promise<HttpResponse<UserModel>>;
}

export interface IRegisterRepository {
  register(params: CreateUserModel): Promise<UserModel>;
}
