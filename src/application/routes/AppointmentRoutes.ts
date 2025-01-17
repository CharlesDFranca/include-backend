import express, { Request, Response } from "express";
import { AppointmentRepository } from "../../infra/modules/appointments/repositories/AppointmentRepository";
import { CreateAppointmentUseCase } from "../../domain/modules/appointments/use-cases/CreateAppointmentUseCase";
import { DoctorRepository } from "../../infra/modules/users/repositories/DoctorRepository";
import { PatientRepository } from "../../infra/modules/users/repositories/PatientRepository";
import { FindAllAppointmentsUseCase } from "../../domain/modules/appointments/use-cases/FindAllAppointmentsUseCase";
import { FindAppointmentByIDUseCase } from "../../domain/modules/appointments/use-cases/FindAppointmentByIDUseCase";
import { DeleteAppointmentUseCase } from "../../domain/modules/appointments/use-cases/DeleteAppointmentUseCase";
import { AppointmentControllers } from "../controllers/AppointmentControllers";
import { authHandler } from "../../infra/utils/middlewares/AuthHandler";

const appointmentRoutes = express.Router();

const appointmentRepository = new AppointmentRepository();
const doctorRepository = new DoctorRepository();
const patientRepository = new PatientRepository();

const createAppointmentUseCase = new CreateAppointmentUseCase(
  appointmentRepository,
  patientRepository,
  doctorRepository,
);
const findAllAppointmentsUseCase = new FindAllAppointmentsUseCase(appointmentRepository);
const findAppointmentByIDUseCase = new FindAppointmentByIDUseCase(appointmentRepository);
const deleteAppointmentUseCase = new DeleteAppointmentUseCase(appointmentRepository);

const appointmentControllers = new AppointmentControllers(
  createAppointmentUseCase,
  findAppointmentByIDUseCase,
  findAllAppointmentsUseCase,
  deleteAppointmentUseCase,
);

appointmentRoutes.use(authHandler);

appointmentRoutes
  .route("/appointments")
  .post((req: Request, res: Response) => appointmentControllers.create(req, res));

appointmentRoutes
  .route("/appointments")
  .get((req: Request, res: Response) => appointmentControllers.findAll(req, res));

appointmentRoutes
  .route("/appointments/:id")
  .get((req: Request, res: Response) => appointmentControllers.findByID(req, res));

appointmentRoutes
  .route("/appointments/:id")
  .delete((req: Request, res: Response) => appointmentControllers.delete(req, res));

export { appointmentRoutes };
