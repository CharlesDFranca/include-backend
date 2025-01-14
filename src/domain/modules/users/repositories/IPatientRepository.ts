import { Patient } from "../entities/Patient";
import { CreaetePatientInput } from "../use-cases/CreatePatientUseCase";

export interface IPatientRepository {
  create(patientData: CreaetePatientInput): Promise<Patient>;
  findByID(id: string): Promise<Patient | null>;
  findByEmail(email: string): Promise<Patient | null>;
  findAll(): Promise<Patient[] | null>;
  delete(id: string): Promise<void>;
}
