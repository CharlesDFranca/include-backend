import { InvalidDataError } from "../../../common/errors/InvalidDataError";

export class Email {
  constructor(private readonly value: string) {
    const EMAILREGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    this.value = value.trim().toLowerCase();

    if (!EMAILREGEX.test(this.value)) {
      throw new InvalidDataError("Invalid email");
    }
  }

  get getEmail(): string {
    return this.value;
  }

  public updateEmail(email: string): Email {
    return new Email(email);
  }

  public toString(): string {
    return this.getEmail;
  }
}
