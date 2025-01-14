import express, { Request, Response } from "express";
import { PatientController } from "../controllers/PatientControllers";
import { PatientRepository } from "../../infra/modules/users/repositories/PatientRepository";
import { CreatePatientUseCase } from "../../domain/modules/users/use-cases/CreatePatientUseCase";
import { FindAllPatientsUseCase } from "../../domain/modules/users/use-cases/FindAllPatientsUseCase";
import { FindPatientByIDUseCase } from "../../domain/modules/users/use-cases/FindPatientByIDUseCase";
import { DeletePatientUseCase } from "../../domain/modules/users/use-cases/DeletePatientUseCase";

const patientRoutes = express.Router();

const patientRepository = new PatientRepository();

const createPatientUseCase = new CreatePatientUseCase(patientRepository);
const findAllPatientsUseCase = new FindAllPatientsUseCase(patientRepository);
const findPatientByIDUseCase = new FindPatientByIDUseCase(patientRepository);
const deletePatientUseCase = new DeletePatientUseCase(patientRepository);

const patientControllers = new PatientController(
  createPatientUseCase,
  findPatientByIDUseCase,
  findAllPatientsUseCase,
  deletePatientUseCase,
);

patientRoutes
  .route("/patients")
  .post((req: Request, res: Response) => patientControllers.create(req, res));

patientRoutes
  .route("/patients/:id")
  .get((req: Request, res: Response) => patientControllers.findByID(req, res));

patientRoutes
  .route("/patients")
  .get((req: Request, res: Response) => patientControllers.findAll(req, res));

patientRoutes
  .route("/patients/:id")
  .delete((req: Request, res: Response) => patientControllers.delete(req, res));

export { patientRoutes };
