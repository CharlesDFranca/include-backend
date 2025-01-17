import * as bcrypt from "bcrypt";
import { IHashProvider } from "../../../domain/modules/auth/IHashProvider";

export class BCryptHashProvider implements IHashProvider {
  private readonly saltRounds = 10;
  private static instance: BCryptHashProvider;

  private constructor() {}

  public static get Instance(): BCryptHashProvider {
    if (!BCryptHashProvider.instance) {
      BCryptHashProvider.instance = new BCryptHashProvider();
    }

    return BCryptHashProvider.instance;
  }

  async hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this.saltRounds);
  }

  async compare(plainText: string, hashedText: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashedText);
  }
}
