import { Patient } from "../entities/Patient";
import { CreaetePatientInput } from "../use-cases/CreatePatientUseCase";

export interface IPatientRepository {
  create(patientData: CreaetePatientInput): Promise<Patient>;
  findByID(id: string): Promise<Patient>;
  findByEmail(email: string): Promise<Patient>;
  findAll(): Promise<Patient[]>;
  delete(id: string): Promise<void>;
}
