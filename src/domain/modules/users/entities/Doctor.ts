import { AbstractUser } from "./AbstractUser";
import { Email } from "../value-objects/Email";
import { Availability } from "../value-objects/Availability";

export class Doctor extends AbstractUser {
  constructor(
    id: string | undefined,
    name: string,
    email: Email,
    private specialty: string,
    private availability: Availability,
    password: string,
  ) {
    super({ name, email, password }, id!);
    this.availability = availability;
  }
  get getSpecialty(): string {
    return this.specialty;
  }

  set setSpecialty(specialty: string) {
    this.specialty = specialty;
  }

  get getAvailability() {
    return this.availability;
  }
}
