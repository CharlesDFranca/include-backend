import { InvalidCredentialsError } from "../../../../common/errors/InvalidCredentialsError";
import { NotFoundError } from "../../../../common/errors/NotFoundError";
import { IAuthProvider } from "../../../auth/IAuthProvider";
import { IHashProvider } from "../../../auth/IHashProvider";
import { AuthUserProps } from "../../dtos/AuthUserProps";
import { IDoctorRepository } from "../../repositories/IDoctorRepository";

export class AuthDoctorUseCase {
  constructor(
    private readonly doctorRepository: IDoctorRepository,
    private readonly authProvider: IAuthProvider,
    private readonly hashProvider: IHashProvider,
  ) {}

  async execute({ email, password }: AuthUserProps) {
    const doctor = await this.doctorRepository.findByEmail(email);

    if (!doctor) {
      throw new NotFoundError("Doctor not found");
    }

    const validPassword = await this.hashProvider.compare(password, doctor.getPassword);

    if (!validPassword) {
      throw new InvalidCredentialsError("Invalid credentials");
    }

    const access_token = this.authProvider.generateToken(doctor.getID);

    return access_token;
  }
}
