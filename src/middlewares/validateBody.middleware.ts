import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod/v3";
import { HttpStatusCode } from "../interfaces/http.js";

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Ocorreu um erro na validação",
        errors: result.error.flatten(),
      });
    }

    next();
  };
}
