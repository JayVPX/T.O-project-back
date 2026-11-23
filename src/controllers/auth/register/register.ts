import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
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
    try {
      if (!httpRequest.body) {
        return { body: "Insira os dados do usuário", statusCode: 400 };
      }

      const user = await this.registerUseCase.execute(httpRequest.body);

      return { body: user, statusCode: 201 };
    } catch (error) {
      console.error("Ocorreu um erro na requisição:", error);
      return { body: "Algo deu errado, tente novamente", statusCode: 500 };
    }
  }
}
