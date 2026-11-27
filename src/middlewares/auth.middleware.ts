import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError.js";
import { JWTTokenProvider } from "../providers/tokenProvider/jwtTokenProvider.js";
import { HttpStatusCode } from "../interfaces/http.js";

export async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não providenciado", HttpStatusCode.UNAUTHORIZED);
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new AppError("Token inválido", HttpStatusCode.UNAUTHORIZED);
  }

  try {
    const tokenProvider = new JWTTokenProvider();

    const payload = await tokenProvider.verify(token);

    // req.user = {
    //   id: payload.sub,
    // };

    return next();
  } catch {
    throw new AppError(
      "Token inválido ou expirado",
      HttpStatusCode.UNAUTHORIZED,
    );
  }
}
