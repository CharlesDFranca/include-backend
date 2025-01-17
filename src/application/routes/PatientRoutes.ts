import express, { Request, Response } from "express";
import { PatientController } from "../controllers/PatientControllers";
import { PatientRepository } from "../../infra/modules/users/repositories/PatientRepository";
import { FindAllPatientsUseCase } from "../../domain/modules/users/use-cases/patients/FindAllPatientsUseCase";
import { FindPatientByIDUseCase } from "../../domain/modules/users/use-cases/patients/FindPatientByIDUseCase";
import { DeletePatientUseCase } from "../../domain/modules/users/use-cases/patients/DeletePatientUseCase";
import { CreatePatientUseCase } from "../../domain/modules/users/use-cases/patients/CreatePatientUseCase";
import { BCryptHashProvider } from "../../infra/modules/auth/BcryptHashProvider";
import { JWTAuthProvider } from "../../infra/modules/auth/JWTAuthProvider";
import { AuthPatientUseCase } from "../../domain/modules/users/use-cases/patients/AuthPatientUseCase";

const patientRoutes = express.Router();

const patientRepository = new PatientRepository();
const hashProvider = new BCryptHashProvider();
const authProvider = new JWTAuthProvider();

const createPatientUseCase = new CreatePatientUseCase(patientRepository, hashProvider);
const authPatientUseCase = new AuthPatientUseCase(patientRepository, authProvider, hashProvider);
const findAllPatientsUseCase = new FindAllPatientsUseCase(patientRepository);
const findPatientByIDUseCase = new FindPatientByIDUseCase(patientRepository);
const deletePatientUseCase = new DeletePatientUseCase(patientRepository);

const patientControllers = new PatientController(
  createPatientUseCase,
  authPatientUseCase,
  findPatientByIDUseCase,
  findAllPatientsUseCase,
  deletePatientUseCase,
);

patientRoutes
  .route("/patients")
  .post((req: Request, res: Response) => patientControllers.create(req, res));

patientRoutes
  .route("/auth/patients")
  .post((req: Request, res: Response) => patientControllers.auth(req, res));

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
