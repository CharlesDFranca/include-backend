import { Request, Response } from "express";
import {
  CreateDoctorInput,
  CreateDoctorUseCase,
} from "../../domain/modules/users/use-cases/doctors/CreateDoctorUseCase";
import { DeleteDoctorUseCase } from "../../domain/modules/users/use-cases/doctors/DeleteDoctorUseCase";
import { FindAllDoctorsUseCase } from "../../domain/modules/users/use-cases/doctors/FindAllDoctorsUseCase";
import { FindDoctorByIDUseCase } from "../../domain/modules/users/use-cases/doctors/FindDoctorByIDUseCase";
import { MissingRequiredFieldsError } from "../../domain/common/errors/MissingRequiredFieldsError";

export class DoctorController {
  constructor(
    private readonly createDoctorUseCase: CreateDoctorUseCase,
    private readonly findDoctorByIDUseCase: FindDoctorByIDUseCase,
    private readonly findAllDoctorsUseCase: FindAllDoctorsUseCase,
    private readonly deleteDoctorUseCase: DeleteDoctorUseCase,
  ) {}

  async create(req: Request, res: Response) {
    try {
      const { name, email, specialty, availability, password }: CreateDoctorInput = req.body;

      if (!name || !email || !specialty || !availability || !password) {
        throw new MissingRequiredFieldsError("Missing required fields");
      }

      const doctor = await this.createDoctorUseCase.execute({
        name,
        email,
        availability,
        password,
        specialty,
      });

      res.status(201).json({
        id: doctor.getID,
        name: doctor.getName,
        email: doctor.getEmail,
        specialty: doctor.getSpecialty,
        availability: doctor.getAvailability,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
        return;
      }

      res.status(500).json({ error: error || "Internal Server Error" });
      return;
    }
  }

  async findByID(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const doctor = await this.findDoctorByIDUseCase.execute(id);

      res.status(200).json({
        id: doctor.getID,
        name: doctor.getName,
        email: doctor.getEmail,
        specialty: doctor.getSpecialty,
        availability: doctor.getAvailability,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
        return;
      }

      res.status(500).json({ error: error || "Internal Server Error" });
      return;
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const doctors = await this.findAllDoctorsUseCase.execute();

      const doctorsWithoutPass = doctors!.map((doctor) => {
        return {
          id: doctor.getID,
          name: doctor.getName,
          email: doctor.getEmail,
          specialty: doctor.getSpecialty,
          availability: doctor.getAvailability,
        };
      });

      res.status(200).json(doctorsWithoutPass);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
        return;
      }

      res.status(500).json({ error: error || "Internal Server Error" });
      return;
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this.deleteDoctorUseCase.execute(id);

      res.status(204).json({});
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
        return;
      }

      res.status(500).json({ error: error || "Internal Server Error" });
      return;
    }
  }
}
