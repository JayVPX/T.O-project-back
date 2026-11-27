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
import { HttpStatusCode } from "../interfaces/http.js";
import { AppError } from "../errors/appError.js";
import { GetResponsibleAppointmentsController } from "../controllers/appointments/get/getResponsibleAppointments.js";
import { PostgresGetResponsibleAppointments } from "../repositories/appointments/get/postgresGetResponsibleAppointments.js";
import { GetResponsibleAppointmentsUseCase } from "../services/appointments/get/getResponsibleAppointmentUseCase.js";
import { PostgresGetTherapistAppointments } from "../repositories/appointments/get/postgresGetTherapistAppointment.js";
import { GetTherapistAppointmentsUseCase } from "../services/appointments/get/getTherapistAppointmentUseCase.js";
import { GetTherapistAppointmentsController } from "../controllers/appointments/get/getTherapistAppointments.js";

const router = Router();

// Create
router.post("/create", async (req, res) => {
  try {
    const createAppointmentRepository =
      new PostgresCreateAppointmentRepository();
    const createAppointmentUseCase = new CreateAppointmentUseCase(
      createAppointmentRepository,
    );
    const createAppointmentController = new CreateAppointmentController(
      createAppointmentUseCase,
    );

    const response = await createAppointmentController.handle({
      body: req.body,
    });

    const { body, statusCode } = response;

    res.status(statusCode).send(body);
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res
      .status(HttpStatusCode.SERVER_ERROR)
      .json({ message: "Erro interno no servidor" });
  }
});

// Get All
router.get("/get", async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res
      .status(HttpStatusCode.SERVER_ERROR)
      .json({ message: "Erro interno no servidor" });
  }
});

// Get One
router.get("/get/:id", async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res
      .status(HttpStatusCode.SERVER_ERROR)
      .json({ message: "Erro interno no servidor" });
  }
});

// Get Patient Appointments
router.get("/patient/:id", async (req, res) => {
  try {
    const getPatientAppointmentsRepository =
      new PostgresGetPatientAppointments();
    const getPatientAppointmentsUseCase = new GetPatientAppointmentsUseCase(
      getPatientAppointmentsRepository,
    );
    const getPatientAppointmentsController =
      new GetPatientAppointmentsController(getPatientAppointmentsUseCase);

    const response = await getPatientAppointmentsController.handle({
      params: req.params.id,
    });

    const { body, statusCode } = response;

    res.status(statusCode).send(body);
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res
      .status(HttpStatusCode.SERVER_ERROR)
      .json({ message: "Erro interno no servidor" });
  }
});

// Get Responsible Appointments
router.get("/user/:id", async (req, res) => {
  try {
    const getResponsibleRepository = new PostgresGetResponsibleAppointments();
    const getResponsibleUseCase = new GetResponsibleAppointmentsUseCase(
      getResponsibleRepository,
    );
    const getResponsibleController = new GetResponsibleAppointmentsController(
      getResponsibleUseCase,
    );

    const response = await getResponsibleController.handle({
      params: req.params.id,
    });

    const { body, statusCode } = response;

    res.status(statusCode).send(body);
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res
      .status(HttpStatusCode.SERVER_ERROR)
      .json({ message: "Erro interno no servidor" });
  }
});

// Get Therapist Appointments
router.get("/therapist/:id", async (req, res) => {
  try {
    const getTherapistRepository = new PostgresGetTherapistAppointments();
    const getTherapistUseCase = new GetTherapistAppointmentsUseCase(
      getTherapistRepository,
    );
    const getTherapistController = new GetTherapistAppointmentsController(
      getTherapistUseCase,
    );

    const response = await getTherapistController.handle({
      params: req.params.id,
    });
    const { body, statusCode } = response;

    res.status(statusCode).send(body);
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res
      .status(HttpStatusCode.SERVER_ERROR)
      .json({ message: "Erro interno no servidor" });
  }
});

export default router;
