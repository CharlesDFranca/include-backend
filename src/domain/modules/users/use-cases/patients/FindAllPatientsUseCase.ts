import { NotFoundError } from "../../../../common/errors/NotFoundError";
import { Patient } from "../../entities/Patient";
import { IPatientRepository } from "../../repositories/IPatientRepository";

export class FindAllPatientsUseCase {
  constructor(private readonly patientRepository: IPatientRepository) {}

  async execute(): Promise<Patient[] | null> {
    const patients = await this.patientRepository.findAll();

    if (!patients) {
      throw new NotFoundError("Not patient found");
    }

    return patients;
  }
}
