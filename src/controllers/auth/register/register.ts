import { AppError } from "../../../errors/appError.js";
import {
  HttpStatusCode,
  type HttpRequest,
  type HttpResponse,
} from "../../../interfaces/http.js";
import type {
  CreateUserModelDto,
  UserModelDto,
} from "../../../models/user.model.js";
import type { IRegisterController, IRegisterUseCase } from "./protocols.js";

export class RegisterController implements IRegisterController {
  constructor(private readonly registerUseCase: IRegisterUseCase) {}
  async handle(
    httpRequest: HttpRequest<CreateUserModelDto>,
  ): Promise<HttpResponse<UserModelDto>> {
    if (!httpRequest.body) {
      throw new AppError(
        "Insira os dados do usuário",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const user = await this.registerUseCase.execute(httpRequest.body);

    return { body: user, statusCode: 201 };
  }
}
