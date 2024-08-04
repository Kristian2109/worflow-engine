import { NextFunction, Request, Response } from 'express';
import z from 'zod';

export function workflowIdQueryValidator(req: Request, res: Response, next: NextFunction) {
  const workflowId = req.query.workflowId;
  z.string().uuid().safeParse(workflowId);
  next();
}