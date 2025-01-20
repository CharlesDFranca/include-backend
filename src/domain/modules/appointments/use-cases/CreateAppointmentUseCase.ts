import { InvalidDataError } from "../../../common/errors/InvalidDataError";
import { NotFoundError } from "../../../common/errors/NotFoundError";
import { IDoctorRepository } from "../../users/repositories/IDoctorRepository";
import { IPatientRepository } from "../../users/repositories/IPatientRepository";
import { Appointment } from "../entities/Appointment";
import { IAppointmentRepository } from "../repositories/IAppointmentsRepositories.";

export type CreateAppointmentInput = {
  patientID: string;
  doctorID: string;
  startsAt: string;
};

const DaysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export class CreateAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly patientRepository: IPatientRepository,
    private readonly doctorRepository: IDoctorRepository,
  ) {}

  async execute({ doctorID, patientID, startsAt }: CreateAppointmentInput) {
    const patient = await this.patientRepository.findByID(patientID);

    if (!patient) {
      throw new NotFoundError("Patient not found");
    }

    const doctor = await this.doctorRepository.findByID(doctorID);

    if (!doctor) {
      throw new NotFoundError("Doctor not found");
    }

    const patientAppointments =
      await this.appointmentRepository.findAppointmentsByPatient(patientID);

    if (patientAppointments) {
      patient.setAppointment = patientAppointments;
    }

    const doctorAppointments = await this.appointmentRepository.findAppointmentsByDoctor(doctorID);

    if (doctorAppointments) {
      doctor.setAppointment = doctorAppointments;
    }

    const startAppointment = new Date(startsAt);

    const hours = startAppointment.getHours().toString().padStart(2, "0");
    const minutes = startAppointment.getMinutes().toString().padStart(2, "0");

    const formattedTime = `${hours}:${minutes}`;

    if (!doctor.getAvailability.isAvailable(DaysOfWeek[startAppointment.getDay()], formattedTime)) {
      throw new InvalidDataError(
        `It is not possible to make an appointment at this time: ${DaysOfWeek[startAppointment.getDay()]} at ${formattedTime}`,
      );
    }

    const endsAt = new Date(new Date(startsAt).getTime() + 30 * 60 * 1000);

    Appointment.validateOverlappingAppointments(patient.getAppointments, startAppointment, endsAt);
    Appointment.validateOverlappingAppointments(doctor.getAppointments, startAppointment, endsAt);

    const newAppointment = await this.appointmentRepository.create({
      doctorID,
      patientID,
      startsAt: startAppointment,
      endsAt,
    });

    newAppointment.addAppointment(patient, doctor);

    return newAppointment;
  }
}
