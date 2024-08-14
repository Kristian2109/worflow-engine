import { NextFunction, Request, RequestHandler, Response } from "express";

export default function requestHandler(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}
