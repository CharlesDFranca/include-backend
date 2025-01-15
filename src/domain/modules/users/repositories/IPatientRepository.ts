import { Patient } from "../entities/Patient";
import { CreatePatientInput } from "../use-cases/patients/CreatePatientUseCase";

export interface IPatientRepository {
  create(patientData: CreatePatientInput): Promise<Patient>;
  findByID(id: string): Promise<Patient | null>;
  findByEmail(email: string): Promise<Patient | null>;
  findAll(): Promise<Patient[] | null>;
  delete(id: string): Promise<boolean>;
}
