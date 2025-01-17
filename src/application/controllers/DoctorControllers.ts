import { Request, Response } from "express";
import {
  CreateDoctorInput,
  CreateDoctorUseCase,
} from "../../domain/modules/users/use-cases/doctors/CreateDoctorUseCase";
import { DeleteDoctorUseCase } from "../../domain/modules/users/use-cases/doctors/DeleteDoctorUseCase";
import { FindAllDoctorsUseCase } from "../../domain/modules/users/use-cases/doctors/FindAllDoctorsUseCase";
import { FindDoctorByIDUseCase } from "../../domain/modules/users/use-cases/doctors/FindDoctorByIDUseCase";
import { MissingRequiredFieldsError } from "../../domain/common/errors/MissingRequiredFieldsError";
import { AuthDoctorUseCase } from "../../domain/modules/users/use-cases/doctors/AuthDoctorUseCase";

export class DoctorControllers {
  constructor(
    private readonly createDoctorUseCase: CreateDoctorUseCase,
    private readonly authDoctorUseCase: AuthDoctorUseCase,
    private readonly findDoctorByIDUseCase: FindDoctorByIDUseCase,
    private readonly findAllDoctorsUseCase: FindAllDoctorsUseCase,
    private readonly deleteDoctorUseCase: DeleteDoctorUseCase,
  ) {}

  async create(req: Request, res: Response) {
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
  }

  async auth(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new MissingRequiredFieldsError("Missing Required Fields");
    }

    const access_token = await this.authDoctorUseCase.execute({ email, password });

    res.status(200).json({ token: access_token });
  }

  async findByID(req: Request, res: Response) {
    const { id } = req.params;

    const doctor = await this.findDoctorByIDUseCase.execute(id);

    res.status(200).json({
      id: doctor.getID,
      name: doctor.getName,
      email: doctor.getEmail,
      specialty: doctor.getSpecialty,
      availability: doctor.getAvailability,
    });
  }

  async findAll(req: Request, res: Response) {
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
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await this.deleteDoctorUseCase.execute(id);

    res.status(204).json({});
  }
}
