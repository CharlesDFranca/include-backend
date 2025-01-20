import { AbstractEntity } from "../../../common/entities/AbstractEntity";
import { InvalidDataError } from "../../../common/errors/InvalidDataError";
import { Doctor } from "../../users/entities/Doctor";
import { Patient } from "../../users/entities/Patient";

export type AppointmentProps = {
  patientID: string;
  doctorID: string;
  startsAt: Date;
  endsAt: Date;
};

export class Appointment extends AbstractEntity<AppointmentProps> {
  constructor(id: string, patientID: string, doctorID: string, startsAt: Date) {
    const endsAt = new Date(new Date(startsAt).getTime() + 30 * 60 * 1000);

    super({ patientID, doctorID, endsAt, startsAt }, id);
  }

  get getStartsAt() {
    return this.props.startsAt;
  }

  get getEndsAt() {
    return this.props.endsAt;
  }

  get getPatientID() {
    return this.props.patientID;
  }

  get getDocterID() {
    return this.props.doctorID;
  }

  public addAppointment(patient: Patient, doctor: Doctor) {
    Appointment.validateOverlappingAppointments(
      patient.getAppointments,
      this.getStartsAt,
      this.getEndsAt,
    );
    Appointment.validateOverlappingAppointments(
      doctor.getAppointments,
      this.getStartsAt,
      this.getEndsAt,
    );

    this.linkToPatient(patient);
    this.linkToDoctor(doctor);
  }

  private linkToPatient(patient: Patient) {
    patient.getAppointments.push(this);
  }

  private linkToDoctor(doctor: Doctor) {
    doctor.getAppointments.push(this);
  }

  public static validateOverlappingAppointments(
    appointments: Appointment[],
    startsAt: Date,
    endsAt: Date,
  ): void {
    const overLappingAppointment = appointments.filter(
      (patientAppointment) =>
        (startsAt >= patientAppointment.getStartsAt && startsAt < patientAppointment.getEndsAt) ||
        (endsAt > patientAppointment.getStartsAt && endsAt <= patientAppointment.getEndsAt) ||
        (startsAt <= patientAppointment.getStartsAt && endsAt >= patientAppointment.getEndsAt),
    );

    if (overLappingAppointment.length > 0) {
      throw new InvalidDataError("Overlapping appointment");
    }
  }
}
