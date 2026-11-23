import type { HttpStatusCode } from "../interfaces/http.js";

export class AppError extends Error {
  public readonly statusCode: HttpStatusCode;

  constructor(message: string, statusCode: HttpStatusCode = 500) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
