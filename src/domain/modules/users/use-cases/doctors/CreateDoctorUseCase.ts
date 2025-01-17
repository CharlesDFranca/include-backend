import { BadRequestError } from "../../../../common/errors/BadRequestError";
import { IHashProvider } from "../../../auth/IHashProvider";
import { IDoctorRepository } from "../../repositories/IDoctorRepository";
import { Availability, TimeInterval } from "../../value-objects/Availability";
import { Email } from "../../value-objects/Email";

export type CreateDoctorInput = {
  name: string;
  email: string;
  specialty: string;
  availability: Record<string, TimeInterval[]>;
  password: string;
};

export class CreateDoctorUseCase {
  constructor(
    private readonly doctorRepository: IDoctorRepository,
    private readonly hashProvider: IHashProvider,
  ) {}

  async execute({
    name,
    email,
    specialty,
    password,
    availability: availabilityData,
  }: CreateDoctorInput) {
    const emailExists = await this.doctorRepository.findByEmail(email);

    if (emailExists) {
      throw new BadRequestError("Invalid email");
    }

    const passwordHash = await this.hashProvider.hash(password);

    const doctor = await this.doctorRepository.create({
      name,
      email: new Email(email),
      availability: new Availability(availabilityData),
      password: passwordHash,
      specialty,
    });

    return doctor;
  }
}
