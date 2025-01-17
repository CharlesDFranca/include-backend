import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { MissingRequiredFieldsError } from "../../../domain/common/errors/MissingRequiredFieldsError";
import { NotFoundError } from "../../../domain/common/errors/NotFoundError";
import { BadRequestError } from "../../../domain/common/errors/BadRequestError";
import { UnauthorizedError } from "../../../domain/common/errors/UnauthorizedError";
import { InvalidCredentialsError } from "../../../domain/common/errors/InvalidCredentialsError";
import { InvalidDataError } from "../../../domain/common/errors/InvalidDataError";

export const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof MissingRequiredFieldsError) {
    res.status(400).json({
      error: err.message || "Missing Required Fields.",
    });
    return;
  }

  if (err instanceof NotFoundError) {
    res.status(404).json({
      error: err.message || "Resource Not Found.",
    });
    return;
  }

  if (err instanceof BadRequestError) {
    res.status(400).json({
      error: err.message || "Bad Request.",
    });
    return;
  }

  if (err instanceof UnauthorizedError) {
    res.status(401).json({
      error: err.message || "Unauthorized.",
    });
    return;
  }

  if (err instanceof InvalidCredentialsError) {
    res.status(409).json({
      error: err.message || "Invalid credentials provided.",
    });
    return;
  }

  if (err instanceof InvalidDataError) {
    res.status(400).json({
      error: err.message || "Invalid credentials provided.",
    });
    return;
  }

  console.error(err);
  res.status(500).json({
    error: "Internal Server Error",
  });
  return;
};
