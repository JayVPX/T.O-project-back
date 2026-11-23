import { Router } from "express";
import { RegisterController } from "../controllers/auth/register/register.js";
import { CreateSaController } from "../controllers/auth/createSuperAdmin/createSa.js";
import { PostgresRegisterRepository } from "../repositories/auth/register/postgresRegister.js";
import { RegisterUseCase } from "../services/auth/register/registerUseCase.js";
import { ArgonHashProvider } from "../providers/hashProvider/argonHashProvider.js";
import { LoginController } from "../controllers/auth/login/login.js";
import { LoginUseCase } from "../services/auth/login/loginUseCase.js";
import { PostgresFindByEmail } from "../repositories/user/findByEmail/postgresFindByEmail.js";
import { JWTTokenProvider } from "../providers/tokenProvider/jwtTokenProvider.js";
import { AppError } from "../errors/appError.js";

const router = Router();

const registerRepository = new PostgresRegisterRepository();
const hashProvider = new ArgonHashProvider();
const registerUseCase = new RegisterUseCase(registerRepository, hashProvider);
const registerController = new RegisterController(registerUseCase);

// Register
router.post("/register", async (req, res) => {
  const response = await registerController.handle({
    body: req.body,
  });

  const { body, statusCode } = response;

  res.status(statusCode).send(body);
});

// SA
// router.post("/sa", async (req, res) => {
//   const createSaRepository = new MongoCreateSaRepository();
//   const createSaController = new CreateSaController(createSaRepository);

//   const response = await createSaController.handle({
//     body: req.body,
//   });

//   const { body, statusCode } = response;

//   res.status(statusCode).send(body);
// });

// Login
router.post("/login", async (req, res) => {
  try {
    const findByEmail = new PostgresFindByEmail();
    const hashProvider = new ArgonHashProvider();
    const tokenProvider = new JWTTokenProvider();
    const loginUseCase = new LoginUseCase(
      findByEmail,
      hashProvider,
      tokenProvider,
    );
    const loginController = new LoginController(loginUseCase);

    const response = await loginController.handle({ body: req.body });

    const { body, statusCode } = response;

    res.status(statusCode).send(body);
  } catch (error) {
    console.error(error);

    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    }

    return res.status(500).json({ message: "Erro interno no servidor" });
  }
});

// Logout
router.post("/logout", async (req, res) => {});

export default router;
