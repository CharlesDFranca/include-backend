import { NotFoundError } from "../../../../common/errors/NotFoundError";
import { IDoctorRepository } from "../../repositories/IDoctorRepository";

export class FindAllDoctorsUseCase {
  constructor(private readonly doctorRepository: IDoctorRepository) {}

  async execute() {
    const doctors = await this.doctorRepository.findAll();

    if (!doctors) {
      throw new NotFoundError("Doctor not found");
    }

    return doctors;
  }
}
