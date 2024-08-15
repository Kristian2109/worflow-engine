import { NextFunction, Request, Response } from "express";

export default function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  res.send({
    error: error.message
  });
  next(error);
}