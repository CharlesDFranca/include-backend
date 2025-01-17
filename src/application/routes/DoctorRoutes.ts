import express, { Request, Response } from "express";
import { DoctorRepository } from "../../infra/modules/users/repositories/DoctorRepository";
import { CreateDoctorUseCase } from "../../domain/modules/users/use-cases/doctors/CreateDoctorUseCase";
import { FindAllDoctorsUseCase } from "../../domain/modules/users/use-cases/doctors/FindAllDoctorsUseCase";
import { FindDoctorByIDUseCase } from "../../domain/modules/users/use-cases/doctors/FindDoctorByIDUseCase";
import { DeleteDoctorUseCase } from "../../domain/modules/users/use-cases/doctors/DeleteDoctorUseCase";
import { DoctorControllers } from "../controllers/DoctorControllers";
import { BCryptHashProvider } from "../../infra/modules/auth/BcryptHashProvider";
import { AuthDoctorUseCase } from "../../domain/modules/users/use-cases/doctors/AuthDoctorUseCase";
import { JWTAuthProvider } from "../../infra/modules/auth/JWTAuthProvider";

const doctorRoutes = express.Router();

const doctorRepository = new DoctorRepository();
const hashProvider = BCryptHashProvider.Instance;
const authProvider = JWTAuthProvider.Instance;

const createDoctorUseCase = new CreateDoctorUseCase(doctorRepository, hashProvider);
const authDoctorUseCase = new AuthDoctorUseCase(doctorRepository, authProvider, hashProvider);
const findAllDoctorsUseCase = new FindAllDoctorsUseCase(doctorRepository);
const findDoctorByIDUseCase = new FindDoctorByIDUseCase(doctorRepository);
const deleteDoctorUseCase = new DeleteDoctorUseCase(doctorRepository);

const doctorControllers = new DoctorControllers(
  createDoctorUseCase,
  authDoctorUseCase,
  findDoctorByIDUseCase,
  findAllDoctorsUseCase,
  deleteDoctorUseCase,
);

doctorRoutes
  .route("/doctors")
  .post((req: Request, res: Response) => doctorControllers.create(req, res));

doctorRoutes
  .route("/auth/doctors")
  .post((req: Request, res: Response) => doctorControllers.auth(req, res));

doctorRoutes
  .route("/doctors/:id")
  .get((req: Request, res: Response) => doctorControllers.findByID(req, res));

doctorRoutes
  .route("/doctors")
  .get((req: Request, res: Response) => doctorControllers.findAll(req, res));

doctorRoutes
  .route("/doctors/:id")
  .delete((req: Request, res: Response) => doctorControllers.delete(req, res));

export { doctorRoutes };
