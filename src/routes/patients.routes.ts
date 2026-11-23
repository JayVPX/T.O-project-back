import { Router } from "express";
import { CreatePatientController } from "../controllers/patients/create/createPatient.js";
import { PostgresCreatePatient } from "../repositories/patients/create/postgresCreate.js";
import { CreatePatientUseCase } from "../services/patients/create/createPatientUseCase.js";
import { DeletePatientController } from "../controllers/patients/delete/deletePatient.js";
import { DeletePatientUseCase } from "../services/patients/delete/deletePatientUseCase.js";
import { PostgresDeletePatient } from "../repositories/patients/delete/postgresDelete.js";
import { PostgresGetOnePatient } from "../repositories/patients/get/postgresGetOne.js";
import { GetOnePatientController } from "../controllers/patients/get/getOnePatient.js";
import { GetOnePatientUseCase } from "../services/patients/get/getOnePatientUseCase.js";
import { PostgresGetAllPatients } from "../repositories/patients/get/postgresGetAll.js";
import { GetAllPatientUseCase } from "../services/patients/get/getAllPatientsUseCase.js";
import { GetAllPatientsController } from "../controllers/patients/get/getAllPatients.js";
import { PostgresGetUserPatients } from "../repositories/patients/get/postgresGetUser.js";
import { GetUserPatientsUseCase } from "../services/patients/get/getUserPatientsUseCase.js";
import { GetUserPatientsController } from "../controllers/patients/get/getUserPatients.js";
import { GetTherapistPatientsController } from "../controllers/patients/get/getTherapistPatients.js";
import { PostgresGetTherapistPatients } from "../repositories/patients/get/postgresGetTherapist.js";
import { GetTherapistUseCase } from "../services/patients/get/getTherapistPatientsUseCase.js";
import { AppError } from "../errors/appError.js";
import { HttpStatusCode } from "../interfaces/http.js";

const router = Router();

// Create
router.post("/create", async (req, res) => {
  try {
    const createRepository = new PostgresCreatePatient();
    const createUseCase = new CreatePatientUseCase(createRepository);
    const createController = new CreatePatientController(createUseCase);

    const response = await createController.handle({ body: req.body });

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

// GetOne
router.get("/:id", async (req, res) => {
  try {
    const getOneRepository = new PostgresGetOnePatient();
    const getOneUseCase = new GetOnePatientUseCase(getOneRepository);
    const getOneController = new GetOnePatientController(getOneUseCase);

    const response = await getOneController.handle({ params: req.params.id });
    const { body, statusCode } = response;

    res.status(statusCode).send(body);
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    }

    return res
      .status(HttpStatusCode.SERVER_ERROR)
      .json({ message: "Erro interno no servidor" });
  }
});

// GetAll
router.get("", async (req, res) => {
  try {
    const getAllRepository = new PostgresGetAllPatients();
    const getAllUseCase = new GetAllPatientUseCase(getAllRepository);
    const getAllController = new GetAllPatientsController(getAllUseCase);

    const response = await getAllController.handle();
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

// GetUserPatients
router.get("/user/:id", async (req, res) => {
  try {
    const getUserPatientsRepository = new PostgresGetUserPatients();
    const getUserPatientsUseCase = new GetUserPatientsUseCase(
      getUserPatientsRepository,
    );
    const getUserPatientsController = new GetUserPatientsController(
      getUserPatientsUseCase,
    );

    const response = await getUserPatientsController.handle({
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

// GetTherapistPatients
router.get("/therapist/:id", async (req, res) => {
  try {
    const getTherapistPatientsRepository = new PostgresGetTherapistPatients();
    const getTherapistPatientsUseCase = new GetTherapistUseCase(
      getTherapistPatientsRepository,
    );
    const getTherapistPatientsController = new GetTherapistPatientsController(
      getTherapistPatientsUseCase,
    );

    const response = await getTherapistPatientsController.handle({
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

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const deleteRepository = new PostgresDeletePatient();
    const deleteUseCase = new DeletePatientUseCase(deleteRepository);
    const deleteController = new DeletePatientController(deleteUseCase);

    const response = await deleteController.handle({ params: req.params.id });

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
