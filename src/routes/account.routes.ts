import { Router } from "express";
import { RegisterController } from "../controllers/account/register/register.js";
import { MongoRegisterRepository } from "../repositories/account/register/mongoRegister.js";
import { CreateSaController } from "../controllers/account/createSuperAdmin/createSa.js";
import { MongoCreateSaRepository } from "../repositories/account/createSa/mongoCreateSa.js";
import { PostgresClient } from "../databases/postgree.js";
import { PostgresRegisterRepository } from "../repositories/account/register/postgresRegister.js";

const router = Router();

// Register
router.post("/register", async (req, res) => {
  // const registerRepository = new MongoRegisterRepository();
  const registerRepository = new PostgresRegisterRepository();
  const registerController = new RegisterController(registerRepository);

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
