import { NotFoundError } from "../../../common/errors/NotFoundError";
import { IDoctorRepository } from "../../users/repositories/IDoctorRepository";
import { IPatientRepository } from "../../users/repositories/IPatientRepository";
import { AppointmentProps } from "../entities/Appointment";
import { IAppointmentRepository } from "../repositories/IAppointmentsRepositories.";

export class CreateAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly patientRepository: IPatientRepository,
    private readonly doctorRepository: IDoctorRepository,
  ) {}

  async execute({ doctorID, patientID, startsAt, endsAt }: AppointmentProps) {
    const pacient = await this.patientRepository.findByID(patientID);

    if (!pacient) {
      throw new NotFoundError("Patient not found");
    }

    const doctor = await this.doctorRepository.findByID(doctorID);

    if (!doctor) {
      throw new NotFoundError("Doctor not found");
    }

    const appointment = await this.appointmentRepository.create({
      doctorID,
      patientID,
      startsAt,
      endsAt,
    });

    appointment.addAppointment(pacient, doctor);

    return appointment;
  }
}
