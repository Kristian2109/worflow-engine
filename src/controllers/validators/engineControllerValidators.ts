import { NextFunction, Request } from 'express';
import z from 'zod';

export function worflowIdQueryValidator(req: Request, res: Response, next: NextFunction) {
  const workflowId = req.query.workflowId;
  z.string().uuid().safeParse(workflowId);
  next();
}