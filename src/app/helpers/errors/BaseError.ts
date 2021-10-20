import { ErrorProps } from "./errorsInterface";

export class BaseError extends Error {
  private httpCode: number;
  private error: any;
  private errorType?: string;

  constructor({ message, httpCode, error, errorType }: ErrorProps) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);

    this.httpCode = httpCode || 500;
    this.error = error;
    this.errorType = errorType || "SERVER_ERROR";
  }
}
