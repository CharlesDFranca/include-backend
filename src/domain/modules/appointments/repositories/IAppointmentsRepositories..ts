import { Appointment, AppointmentProps } from "../entities/Appointment";

export interface IAppointmentRepository {
  create(appointmentData: AppointmentProps): Promise<Appointment>;
  findByID(id: string): Promise<Appointment | null>;
  findAll(): Promise<Appointment[] | null>;
  delete(id: string): Promise<void>;
  deleteByPatientID(patientID: string): Promise<void>;
  deleteByDoctorID(doctorID: string): Promise<void>;
}
