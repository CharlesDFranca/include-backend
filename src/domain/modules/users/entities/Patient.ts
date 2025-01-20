import { Appointment } from "../../appointments/entities/Appointment";
import { Email } from "../value-objects/Email";
import { AbstractUser } from "./AbstractUser";

export class Patient extends AbstractUser {
  private appointments: Appointment[] = [];

  constructor(
    name: string,
    email: Email,
    private contact: string,
    password: string,
    id: string,
  ) {
    super({ name, email, password }, id);
  }

  get getContact(): string {
    return this.contact;
  }

  set setContact(contact: string) {
    this.contact = contact;
  }

  get getAppointments() {
    return this.appointments;
  }

  set setAppointment(appointments: Appointment[]) {
    this.appointments = appointments;
  }
}
