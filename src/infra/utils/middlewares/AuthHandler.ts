import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../../../domain/common/errors/UnauthorizedError";
import { JWTAuthProvider } from "../../modules/auth/JWTAuthProvider";

export const authHandler = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError("Token in missing");
  }

  const [, token] = authHeader.split(" ");

  const { id } = JWTAuthProvider.Instance.verify(token);

  if (!id) {
    throw new UnauthorizedError("Token in missing");
  }

  return next();
};
