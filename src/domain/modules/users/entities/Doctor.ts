import { AbstractUser } from "./AbstractUser";
import { Email } from "../value-objects/Email";
import { Availability } from "../value-objects/Availability";
import { Appointment } from "../../appointments/entities/Appointment";
import { CRM } from "../value-objects/CRM";

export class Doctor extends AbstractUser {
  private appointments: Appointment[] = [];

  constructor(
    id: string,
    name: string,
    email: Email,
    private contact: string,
    private CRM: CRM,
    private specialty: string,
    private availability: Availability,
    password: string,
  ) {
    super({ name, email, password }, id);
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

  get getAppointments() {
    return this.appointments;
  }

  set setAppointment(appointments: Appointment[]) {
    this.appointments = appointments;
  }

  get getContact() {
    return this.contact;
  }

  get getCRM() {
    return this.CRM;
  }
}
