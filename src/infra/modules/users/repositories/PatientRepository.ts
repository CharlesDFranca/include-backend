import { Patient } from "../../../../domain/modules/users/entities/Patient";
import { IPatientRepository } from "../../../../domain/modules/users/repositories/IPatientRepository";
import { CreatePatientInput } from "../../../../domain/modules/users/use-cases/CreatePatientUseCase";
import { Email } from "../../../../domain/modules/users/value-objects/Email";
import { PatientModel } from "../models/PatientModel";

export class PatientRepository implements IPatientRepository {
  async create({ name, contact, email, password }: CreatePatientInput): Promise<Patient> {
    const patiendDocument = await PatientModel.create({ name, contact, email, password });

    await patiendDocument.save();

    const patient = new Patient(
      patiendDocument.name,
      new Email(patiendDocument.email),
      patiendDocument.contact,
      patiendDocument.password,
      patiendDocument._id.toString(),
    );

    return patient;
  }

  async findByID(id: string): Promise<Patient | null> {
    const patientData = await PatientModel.findById(id);

    if (!patientData) {
      return null;
    }

    return new Patient(
      patientData.name,
      new Email(patientData.email),
      patientData.contact,
      patientData.password,
      patientData._id.toString(),
    );
  }

  async findAll(): Promise<Patient[] | null> {
    const patientsData = await PatientModel.find();

    if (!patientsData) {
      return null;
    }

    const patients = patientsData.map(
      (patient) =>
        new Patient(
          patient.name,
          new Email(patient.email),
          patient.contact,
          patient.password,
          patient._id.toString(),
        ),
    );

    return patients;
  }

  async findByEmail(email: string): Promise<Patient | null> {
    return await PatientModel.findOne({ $where: email });
  }

  async delete(id: string): Promise<boolean> {
    const patient = await PatientModel.findById(id);

    if (!patient) {
      return false;
    }

    await PatientModel.deleteOne({ _id: id });
    return true;
  }
}
