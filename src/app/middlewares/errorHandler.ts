import { Request, Response, NextFunction } from "express";
import { ResourceNotFoundError } from "../helpers/errors";

// prettier-ignore
export async function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    return res.status(err.httpCode || err.code || 500).json({
      success: false,
      message: err.message,
      errorType: err.errorType || err.name
    });
  }

export async function endpointNotFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next(
    new ResourceNotFoundError({
      message: `API Endpoint (${req.path} -> ${req.method}) not found`,
    })
  );
}
