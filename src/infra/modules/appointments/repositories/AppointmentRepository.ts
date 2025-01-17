import {
  AppointmentProps,
  Appointment,
} from "../../../../domain/modules/appointments/entities/Appointment";
import { IAppointmentRepository } from "../../../../domain/modules/appointments/repositories/IAppointmentsRepositories.";
import { AppointmentModel } from "../models/AppointmentModel";

export class AppointmentRepository implements IAppointmentRepository {
  async create({ patientID, doctorID, startsAt, endsAt }: AppointmentProps): Promise<Appointment> {
    const appointmentDocument = await AppointmentModel.create({
      doctorID,
      patientID,
      endsAt,
      startsAt,
    });

    await appointmentDocument.save();

    const appointment = new Appointment(
      appointmentDocument._id.toString(),
      appointmentDocument.patientID.toString(),
      appointmentDocument.doctorID.toString(),
      appointmentDocument.startsAt,
    );

    return appointment;
  }

  async findByID(id: string): Promise<Appointment | null> {
    const appointmentData = await AppointmentModel.findById(id);

    if (!appointmentData) {
      return null;
    }

    const appointment = new Appointment(
      appointmentData._id.toString(),
      appointmentData.patientID.toString(),
      appointmentData.doctorID.toString(),
      appointmentData.startsAt,
    );

    return appointment;
  }

  async findAll(): Promise<Appointment[] | null> {
    const appointmentsData = await AppointmentModel.find();

    if (!appointmentsData) {
      return null;
    }

    const appointments = appointmentsData.map((appointment) => {
      return new Appointment(
        appointment._id.toString(),
        appointment.patientID.toString(),
        appointment.doctorID.toString(),
        appointment.startsAt,
      );
    });

    console.log(appointments);

    return appointments;
  }
  async delete(id: string): Promise<void> {
    await AppointmentModel.deleteOne({ _id: id });
  }
}
