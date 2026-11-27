import { Router } from "express";
import { AppError } from "../errors/appError.js";
import { HttpStatusCode } from "../interfaces/http.js";
import { CreateAvailabilityController } from "../controllers/availability/create/createAvailability.js";
import { PostgresCreateAvailability } from "../repositories/availability/create/postgresCreate.js";
import { CreateAvailabilityUseCase } from "../services/availability/create/createAvailabilityUseCase.js";
import { PostgresFindAvailabilityConflict } from "../repositories/availability/findConflict/postgresFindConflict.js";
import { GetTherapistAvailabilityDateController } from "../controllers/availability/get/getTherapistDate.js";
import { GetTherapistAvailabilityDateUseCase } from "../services/availability/get/getTherapistDateUseCase.js";
import { PostgresGetTherapistAppointmentsDate } from "../repositories/appointments/get/postgresGetTherapistDate.js";
import { PostgresTherapistDateAvailability } from "../repositories/availability/get/postgresGetTherapistDate.js";

const router = Router();

// Create therapist availability
router.post("/therapist/create", async (req, res) => {
  try {
    const createAvailabilityRepository = new PostgresCreateAvailability();
    const findConflictRepository = new PostgresFindAvailabilityConflict();
    const createAvailabilityUseCase = new CreateAvailabilityUseCase(
      createAvailabilityRepository,
      findConflictRepository,
    );
    const createAvailabilityController = new CreateAvailabilityController(
      createAvailabilityUseCase,
    );

    const response = await createAvailabilityController.handle({
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

// Update therapist availability
router.put("/therapist/:id", async (req, res) => {
  try {
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

// Get therapist avaibility
router.get("/therapist/:id", async (req, res) => {
  try {
    const { date } = req.query;
    const getTherapistAvailabilityRepository =
      new PostgresTherapistDateAvailability();

    const getTherapistAppointmentsDateRepository =
      new PostgresGetTherapistAppointmentsDate();

    const getTherapistAvailabilityUseCase =
      new GetTherapistAvailabilityDateUseCase(
        getTherapistAvailabilityRepository,
        getTherapistAppointmentsDateRepository,
      );

    const getTherapistDateController =
      new GetTherapistAvailabilityDateController(
        getTherapistAvailabilityUseCase,
      );

    const response = await getTherapistDateController.handle({
      params: req.params.id,
      query: date,
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
