import { NotFoundError } from "../../../common/errors/NotFoundError";
import { IAppointmentRepository } from "../repositories/IAppointmentsRepositories.";

export class FindAllAppointmentsUseCase {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  async execute() {
    const appointments = await this.appointmentRepository.findAll();

    if (!appointments) {
      throw new NotFoundError("Appointments not found");
    }

    return appointments;
  }
}
