import type {
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from "../../../interfaces/http.js";
import type { CreateUserModel, UserModel } from "../../../models/user.model.js";
import type { IRegisterController, IRegisterRepository } from "./protocols.js";

export class RegisterController implements IRegisterController {
  constructor(private readonly registerRepository: IRegisterRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateUserModel>,
  ): Promise<HttpResponse<UserModel>> {
    try {
      if (!httpRequest.body) {
        return { body: "deu erro", statusCode: 400 };
      }
      const user = await this.registerRepository.register(httpRequest.body);
      return { body: user, statusCode: 201 };
    } catch (error) {
      return { body: "Something went wrong", statusCode: 500 };
    }
  }
}
