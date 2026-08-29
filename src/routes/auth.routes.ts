import { Router } from "express";
import { RegisterController } from "../controllers/auth/register/register.js";
import { MongoRegisterRepository } from "../repositories/auth/register/mongoRegister.js";
import { CreateSaController } from "../controllers/auth/createSuperAdmin/createSa.js";
import { MongoCreateSaRepository } from "../repositories/auth/createSa/mongoCreateSa.js";
import { PostgresClient } from "../databases/postgree.js";
import { PostgresRegisterRepository } from "../repositories/auth/register/postgresRegister.js";
import { RegisterUseCase } from "../services/auth/registerUseCase.js";

const router = Router();

// Register
router.post("/register", async (req, res) => {
  const registerRepository = new PostgresRegisterRepository();
  const registerUseCase = new RegisterUseCase(registerRepository);
  const registerController = new RegisterController(registerUseCase);

  const response = await registerController.handle({
    body: req.body,
  });

  const { body, statusCode } = response;

  res.status(statusCode).send(body);
});

// SA
router.post("/sa", async (req, res) => {
  const createSaRepository = new MongoCreateSaRepository();
  const createSaController = new CreateSaController(createSaRepository);

  const response = await createSaController.handle({
    body: req.body,
  });

  const { body, statusCode } = response;

  res.status(statusCode).send(body);
});

// Login

export default router;
