import { StatusCodes } from "http-status-codes";
import { BaseError } from "./BaseError";
import { ErrorProps } from "./errorsInterface";

export class UnprocessableEntityError extends BaseError {
  constructor({ message, errorType, error }: ErrorProps) {
    super({
      message:
        message || "Unprocessable Entity. Error during payload Validation.",
      httpCode: StatusCodes.UNPROCESSABLE_ENTITY,
      errorType: errorType || "UNPROCESSABLE_ENTITY",
      error,
    });
  }
}

export class JoiValidationError extends BaseError {
  constructor({ message, error }: ErrorProps) {
    if (error instanceof BaseError) {
      throw error;
    }

    const errors = error.details.map((err: any) => {
      return {
        message: `${message}. ${resolveMessage(err.message, err.path)}`,
        path: err.path,
        type: err.type,
      };
    });
    const errorMessages = errors.map((error: any) => error.message);

    super({
      message: errorMessages.join(", "),
      httpCode: StatusCodes.UNPROCESSABLE_ENTITY,
      errorType: "VALIDATION_FAILED",
      error: errorMessages,
    });
  }
}

function resolveMessage(message: string, path: string[]) {
  const refinedMessage = message.replace(/["']+/g, "");
  if (path.length > 1) {
    return `${refinedMessage} (${path.join("->")})`;
  }

  return refinedMessage;
}
