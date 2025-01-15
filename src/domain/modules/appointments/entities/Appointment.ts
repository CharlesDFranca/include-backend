import { AbstractEntity } from "../../../common/entities/AbstractEntity";
import { MissingRequiredFieldsError } from "../../../common/errors/MissingRequiredFieldsError";
import { Doctor } from "../../users/entities/Doctor";
import { Patient } from "../../users/entities/Patient";

export type AppointmentProps = {
  patientID: string;
  doctorID: string;
  startsAt: Date;
  endsAt: Date;
};

export class Appointment extends AbstractEntity<AppointmentProps> {
  constructor(
    id: string | undefined,
    patientID: string,
    doctorID: string,
    startsAt: Date,
    endsAt: Date,
  ) {
    if (!patientID || !doctorID) {
      throw new MissingRequiredFieldsError("O ID do paciente e do doutor é requerido!");
    }

    if (endsAt.getTime() <= startsAt.getTime()) {
      throw new Error(
        "A data de término da consulta não pode ser anterior ou igual da data de início.",
      );
    }

    super({ patientID, doctorID, endsAt, startsAt });
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
    this.validateOverlappingAppointments(patient.getAppointments);
    this.validateOverlappingAppointments(doctor.getAppointments);

    this.linkToPatient(patient);
    this.linkToDoctor(doctor);
  }

  private linkToPatient(patient: Patient) {
    patient.getAppointments.push(this);
  }

  private linkToDoctor(doctor: Doctor) {
    doctor.getAppointments.push(this);
  }

  public validateOverlappingAppointments(appointments: Appointment[]): void {
    const overLappingAppointment = appointments.filter(
      (patientAppointment) =>
        (this.getStartsAt >= patientAppointment.getStartsAt &&
          this.getStartsAt < patientAppointment.getEndsAt) ||
        (this.getEndsAt > patientAppointment.getStartsAt &&
          this.getEndsAt <= patientAppointment.getEndsAt) ||
        (this.getStartsAt <= patientAppointment.getStartsAt &&
          this.getEndsAt >= patientAppointment.getEndsAt),
    );

    if (overLappingAppointment.length > 0) {
      throw new Error("Overlapping appointment");
    }
  }
}
