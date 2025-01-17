import { InvalidCredentialsError } from "../../../../common/errors/InvalidCredentialsError";
import { IHashProvider } from "../../../auth/IHashProvider";
import { Patient } from "../../entities/Patient";
import { IPatientRepository } from "../../repositories/IPatientRepository";

export type CreatePatientInput = {
  name: string;
  email: string;
  contact: string;
  password: string;
};

export class CreatePatientUseCase {
  constructor(
    private readonly patientRepository: IPatientRepository,
    private readonly hashProvider: IHashProvider,
  ) {}

  async execute({ name, email, contact, password }: CreatePatientInput): Promise<Patient> {
    const emailExists = await this.patientRepository.findByEmail(email);

    if (emailExists) {
      throw new InvalidCredentialsError("Invalid email");
    }

    const passwordHash = await this.hashProvider.hash(password);

    const patient = await this.patientRepository.create({
      name,
      email,
      contact,
      password: passwordHash,
    });

    return patient;
  }
}
