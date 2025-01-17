import { InvalidCredentialsError } from "../../../../common/errors/InvalidCredentialsError";
import { NotFoundError } from "../../../../common/errors/NotFoundError";
import { IAuthProvider } from "../../../auth/IAuthProvider";
import { IHashProvider } from "../../../auth/IHashProvider";
import { AuthUserProps } from "../../dtos/AuthUserProps";
import { IPatientRepository } from "../../repositories/IPatientRepository";

export class AuthPatientUseCase {
  constructor(
    private readonly patientRepository: IPatientRepository,
    private readonly authProvider: IAuthProvider,
    private readonly hashProvider: IHashProvider,
  ) {}

  async execute({ email, password }: AuthUserProps) {
    const patient = await this.patientRepository.findByEmail(email);

    if (!patient) {
      throw new NotFoundError("Patient not found");
    }

    const validPassword = await this.hashProvider.compare(password, patient.getPassword);

    if (!validPassword) {
      throw new InvalidCredentialsError("Invalid credentials");
    }

    const access_token = this.authProvider.generateToken(patient.getID);

    return access_token;
  }
}
