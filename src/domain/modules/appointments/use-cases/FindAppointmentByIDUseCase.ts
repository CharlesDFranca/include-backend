import { NotFoundError } from "../../../common/errors/NotFoundError";
import { IAppointmentRepository } from "../repositories/IAppointmentsRepositories.";

export class FindAppointmentByIDUseCase {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  async execute(id: string) {
    const appointment = await this.appointmentRepository.findByID(id);

    if (!appointment) {
      throw new NotFoundError("Appointment not found");
    }

    return appointment;
  }
}
