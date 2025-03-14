import { NotFoundError } from "../../../../common/errors/NotFoundError";
import { IDoctorRepository } from "../../repositories/IDoctorRepository";

export class FindDoctorByIDUseCase {
  constructor(private readonly doctorRepository: IDoctorRepository) {}

  async execute(id: string) {
    const doctor = await this.doctorRepository.findByID(id);

    if (!doctor) {
      throw new NotFoundError("Doctor not found");
    }

    return doctor;
  }
}
