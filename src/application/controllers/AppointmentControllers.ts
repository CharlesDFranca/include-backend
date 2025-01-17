import { Request, Response } from "express";
import { CreateAppointmentUseCase } from "../../domain/modules/appointments/use-cases/CreateAppointmentUseCase";
import { DeleteAppointmentUseCase } from "../../domain/modules/appointments/use-cases/DeleteAppointmentUseCase";
import { FindAllAppointmentsUseCase } from "../../domain/modules/appointments/use-cases/FindAllAppointmentsUseCase";
import { FindAppointmentByIDUseCase } from "../../domain/modules/appointments/use-cases/FindAppointmentByIDUseCase";
import { MissingRequiredFieldsError } from "../../domain/common/errors/MissingRequiredFieldsError";

export class AppointmentControllers {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
    private readonly findAppointmentByIDUseCase: FindAppointmentByIDUseCase,
    private readonly findAllAppointmentsUseCase: FindAllAppointmentsUseCase,
    private readonly deleteAppointmentUseCase: DeleteAppointmentUseCase,
  ) {}

  async create(req: Request, res: Response) {
    const { patientID, doctorID, startsAt } = req.body;

    if (!patientID || !doctorID || !startsAt) {
      throw new MissingRequiredFieldsError("Missing Required Fields");
    }

    const appointment = await this.createAppointmentUseCase.execute({
      doctorID,
      patientID,
      startsAt,
    });

    res.status(201).json({ ...appointment });
  }

  async findByID(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      throw new MissingRequiredFieldsError("Missing Required Fields");
    }

    const appointment = await this.findAppointmentByIDUseCase.execute(id);

    res.status(200).json({ ...appointment });
  }

  async findAll(req: Request, res: Response) {
    const appointments = await this.findAllAppointmentsUseCase.execute();

    res.status(200).json(appointments);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      throw new MissingRequiredFieldsError("Missing Required Fields");
    }

    await this.deleteAppointmentUseCase.execute(id);

    res.status(204).json({});
  }
}
