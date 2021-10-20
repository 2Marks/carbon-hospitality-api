import { StatusCodes } from "http-status-codes";
import { BaseError } from "./BaseError";
import { ErrorProps } from "./errorsInterface";

export class ResourceNotFoundError extends BaseError {
  constructor({ message, error }: ErrorProps) {
    super({
      message: message || "Resource not found",
      httpCode: StatusCodes.NOT_FOUND,
      errorType: "RESOURCE_NOT_FOUND",
      error: error || message,
    });
  }
}

export class ResourceExistError extends BaseError {
  constructor({ message, error }: ErrorProps) {
    super({
      message: message || "Resource already exists",
      httpCode: StatusCodes.CONFLICT,
      errorType: "RESOURCE_EXIST",
      error,
    });
  }
}
