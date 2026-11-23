import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod/v3";

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Ocorreu um erro na validação",
        errors: result.error.flatten(),
      });
    }

    next();
  };
}
