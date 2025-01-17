import { NotFoundError } from "../../../../common/errors/NotFoundError";
import { IAppointmentRepository } from "../../../appointments/repositories/IAppointmentsRepositories.";
import { IDoctorRepository } from "../../repositories/IDoctorRepository";

export class DeleteDoctorUseCase {
  constructor(
    private readonly doctorRepository: IDoctorRepository,
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}

  async execute(id: string) {
    const doctor = await this.doctorRepository.findByID(id);

    if (!doctor) {
      throw new NotFoundError("Doctor not found");
    }

    await this.appointmentRepository.deleteByDoctorID(id);
    await this.doctorRepository.delete(id);
  }
}
