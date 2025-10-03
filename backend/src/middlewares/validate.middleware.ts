import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodSchema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = schema.parse(req.body); 
    next();
  } catch (err: any) {
    return res.status(400).json({ message: err.errors ?? err.message });
  }
};
