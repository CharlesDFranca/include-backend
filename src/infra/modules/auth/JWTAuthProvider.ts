import jwt from "jsonwebtoken";
import {
  GeneratedAuthKey,
  IAuthProvider,
  VerifyAuthKey,
} from "../../../domain/modules/auth/IAuthProvider";
import { UnauthorizedError } from "../../../domain/common/errors/UnauthorizedError";

export type DecodedToken = {
  sub: string;
};

export class JWTAuthProvider implements IAuthProvider {
  private static instance: JWTAuthProvider;

  private constructor() {}

  public static get Instance(): JWTAuthProvider {
    if (!JWTAuthProvider.instance) {
      JWTAuthProvider.instance = new JWTAuthProvider();
    }

    return JWTAuthProvider.instance;
  }

  generateToken(id: string): GeneratedAuthKey {
    const access_token = jwt.sign({}, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
      subject: id,
    });

    return { access_token };
  }
  verify(token: string): VerifyAuthKey {
    try {
      const { sub: id } = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

      return { id };
    } catch {
      throw new UnauthorizedError("Invalid credentials");
    }
  }
}
