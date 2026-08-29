import type {
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from "../../../interfaces/http.js";
import type {
  CreateUserModelDto,
  UserModelDto,
} from "../../../models/user.model.js";
import type {
  IRegisterController,
  IRegisterRepository,
  IRegisterUseCase,
} from "./protocols.js";

export class RegisterController implements IRegisterController {
  constructor(private readonly registerUseCase: IRegisterUseCase) {}
  async handle(
    httpRequest: HttpRequest<CreateUserModelDto>,
  ): Promise<HttpResponse<UserModelDto>> {
    try {
      if (!httpRequest.body) {
        return { body: "deu erro", statusCode: 400 };
      }
      const user = await this.registerUseCase.execute(httpRequest.body);
      return { body: user, statusCode: 201 };
    } catch (error) {
      return { body: "Something went wrong", statusCode: 500 };
    }
  }
}
