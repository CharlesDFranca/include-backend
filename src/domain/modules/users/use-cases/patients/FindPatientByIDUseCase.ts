import { NotFoundError } from "../../../../common/errors/NotFoundError";
import { Patient } from "../../entities/Patient";
import { IPatientRepository } from "../../repositories/IPatientRepository";

export class FindPatientByIDUseCase {
  constructor(private readonly patientRepository: IPatientRepository) {}

  async execute(id: string): Promise<Patient | null> {
    const patient = await this.patientRepository.findByID(id);

    if (!patient) {
      throw new NotFoundError("Patient not found");
    }

    return patient;
  }
}
