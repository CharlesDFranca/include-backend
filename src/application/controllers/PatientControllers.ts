import { Request, Response } from "express";
import { DeletePatientUseCase } from "../../domain/modules/users/use-cases/patients/DeletePatientUseCase";
import { FindAllPatientsUseCase } from "../../domain/modules/users/use-cases/patients/FindAllPatientsUseCase";
import { FindPatientByIDUseCase } from "../../domain/modules/users/use-cases/patients/FindPatientByIDUseCase";
import { MissingRequiredFieldsError } from "../../domain/common/errors/MissingRequiredFieldsError";
import {
  CreatePatientInput,
  CreatePatientUseCase,
} from "../../domain/modules/users/use-cases/patients/CreatePatientUseCase";
import { AuthPatientUseCase } from "../../domain/modules/users/use-cases/patients/AuthPatientUseCase";
import { StatusCode } from "../../domain/common/enums/StatusCode";

export class PatientController {
  constructor(
    private readonly createPatientUseCase: CreatePatientUseCase,
    private readonly authPatientUseCase: AuthPatientUseCase,
    private readonly findPatientByIDUseCase: FindPatientByIDUseCase,
    private readonly findAllPatientsUseCase: FindAllPatientsUseCase,
    private readonly deletePatientUseCase: DeletePatientUseCase,
  ) {}

  async create(req: Request, res: Response) {
    const { name, email, contact, password }: CreatePatientInput = req.body;

    if (!name || !email || !contact || !password) {
      throw new MissingRequiredFieldsError("Missing Required Fields");
    }

    const patient = await this.createPatientUseCase.execute({ name, email, contact, password });

    res.status(StatusCode.CREATED).json({
      id: patient.getID,
      name: patient.getName,
      email: patient.getEmail,
      contact: patient.getContact,
    });
  }

  async auth(req: Request, res: Response) {
    const { email, password } = req.body;

    console.log({ email, password });

    if (!email || !password) {
      throw new MissingRequiredFieldsError("Missing Required Fields");
    }

    const access_token = await this.authPatientUseCase.execute({ email, password });

    res.status(StatusCode.OK).json({ token: access_token });
  }

  async findByID(req: Request, res: Response) {
    const { id } = req.params;

    const patient = await this.findPatientByIDUseCase.execute(id);

    res.status(StatusCode.OK).json({
      id: patient!.getID,
      name: patient!.getName,
      email: patient!.getEmail,
      contact: patient!.getContact,
    });
  }

  async findAll(req: Request, res: Response) {
    const patients = await this.findAllPatientsUseCase.execute();

    const patientsWithoutPass = patients!.map((patient) => {
      return {
        id: patient!.getID,
        name: patient!.getName,
        email: patient!.getEmail,
        contact: patient!.getContact,
      };
    });

    res.status(StatusCode.OK).json(patientsWithoutPass);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await this.deletePatientUseCase.execute(id);

    res.status(StatusCode.NO_CONTENT).json({});
  }
}
