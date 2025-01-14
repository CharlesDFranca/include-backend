import { MissingRequiredFieldsError } from "../../../common/errors/MissingRequiredFieldsError";
import { Patient } from "../entities/Patient";
import { IPatientRepository } from "../repositories/IPatientRepository";

export type CreaetePatientInput = {
  name: string;
  email: string;
  contact: string;
  password: string;
};

export class CreatePatientUseCase {
  constructor(private readonly patientRepository: IPatientRepository) {}

  async execute({ name, email, contact, password }: CreaetePatientInput): Promise<Patient> {
    if (!name || !email || !contact || !password) {
      throw new MissingRequiredFieldsError("Missing Required Fields");
    }

    const patient = await this.patientRepository.create({ name, email, contact, password });

    return patient;
  }
}
