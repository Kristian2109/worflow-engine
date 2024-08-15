import { NextFunction, Request, Response } from "express";

export default function errorLogger(error: Error, req: Request, res: Response, next: NextFunction) {
  console.log(error);
}