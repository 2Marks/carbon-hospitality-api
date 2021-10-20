import { Request, Response, Router } from "express";
import { UnprocessableEntityError } from "./errors";

interface APIHelperDTO {
  req: Request;
  res: Response;
  // eslint-disable-next-line @typescript-eslint/ban-types
  controller: Function;
  expectPayload?: boolean;
}

/**
 *
 * @param req
 * @param res
 * @param controller
 * @param expectPayload
 */
export async function APIHelper({
  req,
  res,
  controller,
  expectPayload = true,
}: APIHelperDTO): Promise<any> {
  try {
    if (typeof req.body != "undefined" && Array.isArray(req.body)) {
      throw new UnprocessableEntityError({
        message: "Request body must be of type object",
      });
    }

    const payload = Object.assign({}, req.body, req.params, req.query);

    if (expectPayload && Object.keys(payload).length <= 0) {
      throw new UnprocessableEntityError({ message: "No payload sent" });
    }

    const { data, message } = await controller(payload);

    return res.json({ success: true, message, data: data ? data : [] });
  } catch (error) {
    return res.status(error.httpCode || 400).json({
      success: false,
      message: error.message,
      errorType: error.errorType,
      errors: error.error,
    });
  }
}

export const APIRouter = (): Router => Router();
