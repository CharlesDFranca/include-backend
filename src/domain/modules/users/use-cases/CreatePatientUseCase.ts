import { Patient } from "../entities/Patient";
import { IPatientRepository } from "../repositories/IPatientRepository";

export type CreatePatientInput = {
  name: string;
  email: string;
  contact: string;
  password: string;
};

export class CreatePatientUseCase {
  constructor(private readonly patientRepository: IPatientRepository) {}

  async execute({ name, email, contact, password }: CreatePatientInput): Promise<Patient> {
    const patient = await this.patientRepository.create({ name, email, contact, password });

    return patient;
  }
}
