import { NotFoundError } from "../../../../common/errors/NotFoundError";
import { IPatientRepository } from "../../repositories/IPatientRepository";

export class DeletePatientUseCase {
  constructor(private readonly patientRepository: IPatientRepository) {}

  async execute(id: string) {
    const patient = await this.patientRepository.findByID(id);

    if (!patient) {
      throw new NotFoundError("Patient not found");
    }

    await this.patientRepository.delete(id);
  }
}
