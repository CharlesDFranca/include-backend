import { InvalidCredentialsError } from "../../../../common/errors/InvalidCredentialsError";
import { IHashProvider } from "../../../auth/IHashProvider";
import { IDoctorRepository } from "../../repositories/IDoctorRepository";
import { Availability, TimeInterval } from "../../value-objects/Availability";
import { CRM } from "../../value-objects/CRM";
import { Email } from "../../value-objects/Email";

export type CreateDoctorInput = {
  name: string;
  email: string;
  contact: string;
  crm: string;
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
    contact,
    crm,
    specialty,
    password,
    availability: availabilityData,
  }: CreateDoctorInput) {
    const emailExists = await this.doctorRepository.findByEmail(email);

    if (emailExists) {
      throw new InvalidCredentialsError("Invalid email");
    }

    const [value, uf] = crm.split("/");

    const crmExists = await this.doctorRepository.findByCRM(value, uf);

    if (crmExists) {
      throw new InvalidCredentialsError("Invalid CRM");
    }

    const passwordHash = await this.hashProvider.hash(password);

    const newCRM = new CRM(`${value}/${uf.toUpperCase()}`);

    const doctor = await this.doctorRepository.create({
      name,
      email: new Email(email),
      contact,
      crm: newCRM.getSeparateValue,
      availability: new Availability(availabilityData),
      password: passwordHash,
      specialty,
    });

    return doctor;
  }
}
