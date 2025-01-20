import { CreateDoctorDTO } from "../../../../domain/modules/users/dtos/doctors/CreateDoctorDTO";
import { Doctor } from "../../../../domain/modules/users/entities/Doctor";
import { IDoctorRepository } from "../../../../domain/modules/users/repositories/IDoctorRepository";
import { Availability } from "../../../../domain/modules/users/value-objects/Availability";
import { Email } from "../../../../domain/modules/users/value-objects/Email";
import { DoctorModel } from "../models/DoctorModel";
import { CRM } from "../../../../domain/modules/users/value-objects/CRM";

export class DoctorRepository implements IDoctorRepository {
  async create({
    name,
    email,
    contact,
    crm,
    availability,
    password,
    specialty,
  }: CreateDoctorDTO): Promise<Doctor> {
    const doctorDocument = await DoctorModel.create({
      name,
      email,
      contact,
      CRM: crm,
      availability: availability.getAvailability(),
      password,
      specialty,
    });

    await doctorDocument.save();

    const newCRM = new CRM(`${doctorDocument.CRM?.value}/${doctorDocument.CRM?.uf.toUpperCase()}`);

    const doctor = new Doctor(
      doctorDocument._id.toString(),
      doctorDocument.name,
      new Email(doctorDocument.email),
      doctorDocument.contact,
      newCRM,
      doctorDocument.specialty,
      new Availability(doctorDocument.availability),
      doctorDocument.password,
    );

    return doctor;
  }

  async findByID(id: string): Promise<Doctor | null> {
    const doctorData = await DoctorModel.findById(id);

    if (!doctorData) {
      return null;
    }

    const newCRM = new CRM(`${doctorData.CRM?.value}/${doctorData.CRM?.uf.toUpperCase()}`);

    return new Doctor(
      doctorData._id.toString(),
      doctorData.name,
      new Email(doctorData.email),
      doctorData.contact,
      newCRM,
      doctorData.specialty,
      new Availability(doctorData.availability),
      doctorData.password,
    );
  }

  async findByEmail(email: string): Promise<Doctor | null> {
    const doctorData = await DoctorModel.findOne({ email });

    if (!doctorData) {
      return null;
    }

    const newCRM = new CRM(`${doctorData.CRM?.value}/${doctorData.CRM?.uf.toUpperCase()}`);

    return new Doctor(
      doctorData?._id.toString(),
      doctorData.name,
      new Email(doctorData.email),
      doctorData.contact,
      newCRM,
      doctorData.specialty,
      new Availability(doctorData.availability),
      doctorData.password,
    );
  }

  async findByCRM(value: string, uf: string): Promise<Doctor | null> {
    const doctorData = await DoctorModel.findOne({
      "CRM.value": value,
      "CRM.uf": uf.toUpperCase(),
    });

    if (!doctorData) {
      return null;
    }

    const newCRM = new CRM(`${doctorData.CRM?.value}/${doctorData.CRM?.uf.toUpperCase()}`);

    return new Doctor(
      doctorData?._id.toString(),
      doctorData.name,
      new Email(doctorData.email),
      doctorData.contact,
      newCRM,
      doctorData.specialty,
      new Availability(doctorData.availability),
      doctorData.password,
    );
  }

  async findAll(): Promise<Doctor[] | null> {
    const doctorsData = await DoctorModel.find();

    if (!doctorsData) {
      return null;
    }

    return doctorsData.map((doctor) => {
      console.log(doctor.CRM?.value);
      console.log(doctor.CRM?.uf.toUpperCase());
      const newCRM = new CRM(`${doctor.CRM?.value}/${doctor.CRM?.uf.toUpperCase()}`);

      return new Doctor(
        doctor._id.toString(),
        doctor.name,
        new Email(doctor.email),
        doctor.contact,
        newCRM,
        doctor.specialty,
        new Availability(doctor.availability),
        doctor.password,
      );
    });
  }

  async delete(id: string): Promise<void> {
    await DoctorModel.deleteOne({ _id: id });
  }
}
