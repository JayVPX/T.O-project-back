import { Router } from "express";
import { PostgresCreateAppointmentRepository } from "../repositories/appointments/create/postgresCreate.js";
import { CreateAppointmentController } from "../controllers/appointments/create/createAppointment.js";
import { CreateAppointmentUseCase } from "../services/appointments/create/createAppointmentUseCase.js";

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

export default router;
