import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  user?: { userId: number; role: string };
}
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction)
    => {
        try { const authHeader = req.headers.authorization;
        if (!authHeader) {
          return res.status(401).json({ message: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
          return res.status(401).json({ message: "No token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
          id: number;
          role: string;}
        req.user = { userId: decoded.id, role: decoded.role };
        next();
      } catch (err) { return res.status(401).json({ message: "Unauthorized" }); } };