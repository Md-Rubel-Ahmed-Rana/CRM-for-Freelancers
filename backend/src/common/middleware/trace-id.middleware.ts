import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';

export function traceIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  req['traceId'] = randomUUID().replace(/-/g, '');
  next();
}
