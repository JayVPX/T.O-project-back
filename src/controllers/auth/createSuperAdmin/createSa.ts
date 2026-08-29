import type { HttpRequest, HttpResponse } from "../../../interfaces/http.js";
import type {
  CreateUserModelDto,
  UserModelDto,
} from "../../../models/user.model.js";
import type { ICreateSaController, ICreateSaRepository } from "./protocols.js";

export class CreateSaController implements ICreateSaController {
  constructor(private readonly createSaRepository: ICreateSaRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateUserModelDto>,
  ): Promise<HttpResponse<UserModelDto>> {
    try {
      if (!httpRequest.body) {
        return { body: "deu erro", statusCode: 400 };
      }
      const user = await this.createSaRepository.register(httpRequest.body);
      return { body: user, statusCode: 201 };
    } catch (error) {
      return { body: "Something went wrong", statusCode: 500 };
    }
  }
}
