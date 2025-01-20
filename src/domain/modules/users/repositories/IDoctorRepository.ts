import { CreateDoctorDTO } from "../dtos/doctors/CreateDoctorDTO";
import { Doctor } from "../entities/Doctor";

export interface IDoctorRepository {
  create(doctorData: CreateDoctorDTO): Promise<Doctor>;
  findByID(id: string): Promise<Doctor | null>;
  findByEmail(email: string): Promise<Doctor | null>;
  findByCRM(value: string, uf: string): Promise<Doctor | null>;
  findAll(): Promise<Doctor[] | null>;
  delete(id: string): Promise<void>;
}
