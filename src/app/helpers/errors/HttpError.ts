import { StatusCodes } from "http-status-codes";
import { BaseError } from "./BaseError";
import { ErrorProps } from "./errorsInterface";

export class HttpError extends BaseError {
  constructor({ message, error, errorType, status }: ErrorProps) {
    super({
      message: message || "Error occured during operation",
      httpCode: status || StatusCodes.CONFLICT,
      errorType: errorType || "HTTP_ERROR",
      error,
    });
  }
}

export class HttpConnectionError extends BaseError {
  constructor({ message, error }: ErrorProps) {
    super({
      message:
        message || "Error occured during operation. Please try again later.",
      httpCode: StatusCodes.INTERNAL_SERVER_ERROR,
      errorType: "HTTP_CONNECTION_ERROR",
      error,
    });
  }
}
