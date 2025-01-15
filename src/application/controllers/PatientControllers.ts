import { Request, Response } from "express";

import { DeletePatientUseCase } from "../../domain/modules/users/use-cases/patients/DeletePatientUseCase";
import { FindAllPatientsUseCase } from "../../domain/modules/users/use-cases/patients/FindAllPatientsUseCase";
import { FindPatientByIDUseCase } from "../../domain/modules/users/use-cases/patients/FindPatientByIDUseCase";
import { MissingRequiredFieldsError } from "../../domain/common/errors/MissingRequiredFieldsError";
import {
  CreatePatientInput,
  CreatePatientUseCase,
} from "../../domain/modules/users/use-cases/patients/CreatePatientUseCase";

export class PatientController {
  constructor(
    private readonly createPatientUseCase: CreatePatientUseCase,
    private readonly findPatientByIDUseCase: FindPatientByIDUseCase,
    private readonly findAllPatientsUseCase: FindAllPatientsUseCase,
    private readonly deletePatientUseCase: DeletePatientUseCase,
  ) {}

  async create(req: Request, res: Response) {
    try {
      const { name, email, contact, password }: CreatePatientInput = req.body;

      if (!name || !email || !contact || !password) {
        throw new MissingRequiredFieldsError("Missing Required Fields");
      }

      const patient = await this.createPatientUseCase.execute({ name, email, contact, password });

      res.status(201).json({
        id: patient.getID,
        name: patient.getName,
        email: patient.getEmail,
        contact: patient.getContact,
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

      const patient = await this.findPatientByIDUseCase.execute(id);

      res.status(200).json({
        id: patient!.getID,
        name: patient!.getName,
        email: patient!.getEmail,
        contact: patient!.getContact,
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
      const patients = await this.findAllPatientsUseCase.execute();

      const patientsWithoutPass = patients!.map((patient) => {
        return {
          id: patient!.getID,
          name: patient!.getName,
          email: patient!.getEmail,
          contact: patient!.getContact,
        };
      });

      res.status(200).json(patientsWithoutPass);
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

      await this.deletePatientUseCase.execute(id);

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
