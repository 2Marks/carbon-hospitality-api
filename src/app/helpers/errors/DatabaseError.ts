import { StatusCodes } from "http-status-codes";
import { BaseError } from "./BaseError";
import { ErrorProps } from "./errorsInterface";

export class DatabaseError extends BaseError {
  constructor({ message, error, errorType, status }: ErrorProps) {
    super({
      message:
        message ||
        `Error occured during operation. We're currently checking why this is happening.`,
      httpCode: status || StatusCodes.INTERNAL_SERVER_ERROR,
      errorType: errorType || "SERVER_ERROR",
      error,
    });
  }
}
