import { Router } from "express";
import { PostgresCreateAppointmentRepository } from "../repositories/appointments/create/postgresCreate.js";
import { CreateAppointmentController } from "../controllers/appointments/create/createAppointment.js";
import { CreateAppointmentUseCase } from "../services/appointments/create/createAppointmentUseCase.js";
import { PostgresGetAllAppointment } from "../repositories/appointments/get/postgresGetAll.js";
import { GetAllAppointmentController } from "../controllers/appointments/get/getAllAppointment.js";
import { GetAllAppointmentUseCase } from "../services/appointments/get/getAllAppointmentUseCase.js";
import { GetOneAppointmentController } from "../controllers/appointments/get/getOneAppointment.js";
import { GetOneAppointmentUseCase } from "../services/appointments/get/getOneAppointmentUseCase.js";
import { PostgresGetOneAppointment } from "../repositories/appointments/get/postgresGetOne.js";

const router = Router();

router.post("/create", async (req, res) => {
  const createAppointmentRepository = new PostgresCreateAppointmentRepository();
  const createAppointmentUseCase = new CreateAppointmentUseCase(
    createAppointmentRepository,
  );
  const createAppointmentController = new CreateAppointmentController(
    createAppointmentUseCase,
  );

  const response = await createAppointmentController.handle({ body: req.body });

  const { body, statusCode } = response;

  res.status(statusCode).send(body);
});

router.get("/get", async (req, res) => {
  const getAllAppointmentRepository = new PostgresGetAllAppointment();
  const getAllAppointmentUseCase = new GetAllAppointmentUseCase(
    getAllAppointmentRepository,
  );
  const getAllAppointmentController = new GetAllAppointmentController(
    getAllAppointmentUseCase,
  );

  const response = await getAllAppointmentController.handle();
  const { body, statusCode } = response;

  res.status(statusCode).send(body);
});

router.get("/get/:id", async (req, res) => {
  const getOneAppointmentRepository = new PostgresGetOneAppointment();
  const getOneAppointmentUseCase = new GetOneAppointmentUseCase(
    getOneAppointmentRepository,
  );
  const getOneAppointmentController = new GetOneAppointmentController(
    getOneAppointmentUseCase,
  );

  const response = await getOneAppointmentController.handle({
    params: req.params.id,
  });

  const { body, statusCode } = response;

  res.status(statusCode).send(body);
});

export default router;
