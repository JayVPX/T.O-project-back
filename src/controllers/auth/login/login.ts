import { response } from "express";
import {
  HttpStatusCode,
  type HttpRequest,
  type HttpResponse,
} from "../../../interfaces/http.js";
import type {
  LoginRequestDTO,
  LoginResponseDTO,
} from "../../../models/auth.model.js";
import type { ILoginController, ILoginUseCase } from "./protocol.js";
import { AppError } from "../../../errors/appError.js";

export class LoginController implements ILoginController {
  constructor(private readonly loginUseCase: ILoginUseCase) {}

  async handle(
    httpRequest: HttpRequest<LoginRequestDTO>,
  ): Promise<HttpResponse<LoginResponseDTO>> {
    const { body } = httpRequest;

    if (!body) {
      throw new AppError(
        "Informe os dados necessário para o login",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const response = await this.loginUseCase.execute({
      email: body.email,
      password: body.password,
    });

    return { body: response, statusCode: 201 };
  }
}
