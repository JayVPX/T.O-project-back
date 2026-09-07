import { Router } from "express";
import { PostgresCreateAppointmentRepository } from "../repositories/appointments/create/postgresCreate.js";
import { CreateAppointmentController } from "../controllers/appointments/create/createAppointment.js";
import { CreateAppointmentUseCase } from "../services/appointments/create/createAppointmentUseCase.js";

import { GetOneAppointmentController } from "../controllers/appointments/get/getOneAppointment.js";
import { GetOneAppointmentUseCase } from "../services/appointments/get/getOneAppointmentUseCase.js";
import { PostgresGetOneAppointment } from "../repositories/appointments/get/postgresGetOne.js";
import { GetPatientAppointmentsUseCase } from "../services/appointments/get/getPatientAppointmentUseCase.js";
import { GetPatientAppointmentsController } from "../controllers/appointments/get/getPatientAppointments.js";
import { PostgresGetPatientAppointments } from "../repositories/appointments/get/postgresGetPatientAppointments.js";
import { GetActiveAppointmentController } from "../controllers/appointments/get/getActiveAppointment.js";
import { PostgresGetActiveAppointment } from "../repositories/appointments/get/postgresGetActive.js";
import { GetActiveAppointmentUseCase } from "../services/appointments/get/getActiveAppointmentUseCase.js";

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
  console.log("Chamou em");
  const getActiveAppointmentRepository = new PostgresGetActiveAppointment();
  const getActiveAppointmentUseCase = new GetActiveAppointmentUseCase(
    getActiveAppointmentRepository,
  );
  const getActiveAppointmentController = new GetActiveAppointmentController(
    getActiveAppointmentUseCase,
  );

  const response = await getActiveAppointmentController.handle();
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

router.get("/patient/:id", async (req, res) => {
  const getPatientAppointmentsRepository = new PostgresGetPatientAppointments();
  const getPatientAppointmentsUseCase = new GetPatientAppointmentsUseCase(
    getPatientAppointmentsRepository,
  );
  const getPatientAppointmentsController = new GetPatientAppointmentsController(
    getPatientAppointmentsUseCase,
  );

  const response = await getPatientAppointmentsController.handle({
    params: req.params.id,
  });

  const { body, statusCode } = response;

  res.status(statusCode).send(body);
});

export default router;
