import { Request, Response } from "express";
import { CreateAppointmentUseCase } from "../../domain/modules/appointments/use-cases/CreateAppointmentUseCase";
import { DeleteAppointmentUseCase } from "../../domain/modules/appointments/use-cases/DeleteAppointmentUseCase";
import { FindAllAppointmentsUseCase } from "../../domain/modules/appointments/use-cases/FindAllAppointmentsUseCase";
import { FindAppointmentByIDUseCase } from "../../domain/modules/appointments/use-cases/FindAppointmentByIDUseCase";
import { MissingRequiredFieldsError } from "../../domain/common/errors/MissingRequiredFieldsError";
import { NotFoundError } from "../../domain/common/errors/NotFoundError";

export class AppointmentControllers {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
    private readonly findAppointmentByIDUseCase: FindAppointmentByIDUseCase,
    private readonly findAllAppointmentsUseCase: FindAllAppointmentsUseCase,
    private readonly deleteAppointmentUseCase: DeleteAppointmentUseCase,
  ) {}

  async create(req: Request, res: Response) {
    try {
      const { patientID, doctorID, endsAt, startsAt } = req.body;

      if (!patientID || !doctorID || !endsAt || !startsAt) {
        throw new MissingRequiredFieldsError("Missing Required Fields");
      }

      const appointment = await this.createAppointmentUseCase.execute({
        doctorID,
        endsAt,
        patientID,
        startsAt,
      });

      res.status(201).json({ ...appointment });
    } catch (error) {
      if (error instanceof MissingRequiredFieldsError) {
        res.status(400).json({ error: error.message || "Missing Required Fields" });
        return;
      }

      res.status(500).json({ error: error || "Internal Server Error" });
      return;
    }
  }

  async findByID(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new MissingRequiredFieldsError("Missing Required Fields");
      }

      const appointment = await this.findAppointmentByIDUseCase.execute(id);

      res.status(200).json({ ...appointment });
    } catch (error) {
      if (error instanceof MissingRequiredFieldsError) {
        res.status(400).json({ error: error.message || "Missing Required Fields" });
        return;
      }

      if (error instanceof NotFoundError) {
        res.status(404).json({ error: error.message || "Not found" });
        return;
      }

      res.status(500).json({ error: error || "Internal Server Error" });
      return;
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const appointments = await this.findAllAppointmentsUseCase.execute();

      res.status(200).json(appointments);
    } catch (error) {
      if (error instanceof MissingRequiredFieldsError) {
        res.status(400).json({ error: error.message || "Missing Required Fields" });
        return;
      }

      if (error instanceof NotFoundError) {
        res.status(404).json({ error: error.message || "Not found" });
        return;
      }

      res.status(500).json({ error: error || "Internal Server Error" });
      return;
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new MissingRequiredFieldsError("Missing Required Fields");
      }

      await this.deleteAppointmentUseCase.execute(id);

      res.status(204).json({});
    } catch (error) {
      if (error instanceof MissingRequiredFieldsError) {
        res.status(400).json({ error: error.message || "Missing Required Fields" });
        return;
      }

      if (error instanceof NotFoundError) {
        res.status(404).json({ error: error.message || "Not found" });
        return;
      }

      res.status(500).json({ error: error || "Internal Server Error" });
      return;
    }
  }
}
