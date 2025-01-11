import { NextFunction, Request, Response } from 'express';
import { logger } from '../common';

/**
 * Middleware to log incoming requests.
 */
export const logRequestsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
};
