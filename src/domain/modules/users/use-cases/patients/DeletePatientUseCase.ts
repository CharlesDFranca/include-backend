import { NotFoundError } from "../../../../common/errors/NotFoundError";
import { IAppointmentRepository } from "../../../appointments/repositories/IAppointmentsRepositories.";
import { IPatientRepository } from "../../repositories/IPatientRepository";

export class DeletePatientUseCase {
  constructor(
    private readonly patientRepository: IPatientRepository,
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}

  async execute(id: string) {
    const patient = await this.patientRepository.findByID(id);

    if (!patient) {
      throw new NotFoundError("Patient not found");
    }

    await this.appointmentRepository.deleteByPatientID(id);
    await this.patientRepository.delete(id);
  }
}
