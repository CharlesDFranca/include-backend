import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { MissingRequiredFieldsError } from "../../../domain/common/errors/MissingRequiredFieldsError";
import { NotFoundError } from "../../../domain/common/errors/NotFoundError";
import { BadRequestError } from "../../../domain/common/errors/BadRequestError";
import { UnauthorizedError } from "../../../domain/common/errors/UnauthorizedError";
import { InvalidCredentialsError } from "../../../domain/common/errors/InvalidCredentialsError";
import { InvalidDataError } from "../../../domain/common/errors/InvalidDataError";
import { StatusCode } from "../../../domain/common/enums/StatusCode";

export const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof MissingRequiredFieldsError) {
    res.status(StatusCode.BAD_REQUEST).json({
      error: err.message || "Missing Required Fields.",
    });
    return;
  }

  if (err instanceof NotFoundError) {
    res.status(StatusCode.NOT_FOUND).json({
      error: err.message || "Resource Not Found.",
    });
    return;
  }

  if (err instanceof BadRequestError) {
    res.status(StatusCode.BAD_REQUEST).json({
      error: err.message || "Bad Request.",
    });
    return;
  }

  if (err instanceof UnauthorizedError) {
    res.status(StatusCode.UNAUTHORIZED).json({
      error: err.message || "Unauthorized.",
    });
    return;
  }

  if (err instanceof InvalidCredentialsError) {
    res.status(StatusCode.CONFLIC).json({
      error: err.message || "Invalid credentials provided.",
    });
    return;
  }

  if (err instanceof InvalidDataError) {
    res.status(StatusCode.BAD_REQUEST).json({
      error: err.message || "Invalid credentials provided.",
    });
    return;
  }

  console.error(err);
  res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    error: "Internal Server Error",
  });
  return;
};
