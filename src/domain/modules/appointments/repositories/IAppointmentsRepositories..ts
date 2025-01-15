import { Appointment, AppointmentProps } from "../entities/Appointment";

export interface IAppointmentRepository {
  create(appointmentData: AppointmentProps): Promise<Appointment>;
  findByID(id: string): Promise<Appointment | null>;
  findAll(): Promise<Appointment[]>;
  delete(id: string): Promise<void>;
}
