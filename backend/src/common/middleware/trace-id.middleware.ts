import { v4 as uuid } from 'uuid';
import { Request, Response, NextFunction } from 'express';

export function traceIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  req['traceId'] = uuid().replace(/-/g, '');
  next();
}
