/**
 * auth.middleware.ts
 * Middleware to authenticate incoming requests using JWT tokens.
 * Verifies the token, extracts user info, and attaches it to the request object.
 */

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

//Extended Express Request type to include authenticated user data
export interface AuthRequest extends Request {
  user?: { id: number; role: string };
}

/**
 * Verifies the Authorization header for a valid JWT token.
 * If valid, attaches user info (id and role) to req.user.
 * If invalid or missing, returns a 401 Unauthorized response.
 */
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction) => {
        try { const authHeader = req.headers.authorization;
        if (!authHeader) {
          return res.status(401).json({ message: "No token provided" });
        }
         // Expecting header format: "Bearer <token>"
        const token = authHeader.split(" ")[1];
        if (!token) {
          return res.status(401).json({ message: "No token provided" });
        }
         // Verify and decode JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
          id: number;
          role: string;}
          // Attach user info to the request
        req.user = { id: decoded.id, role: decoded.role };
        next();
      } catch (err) { return res.status(401).json({ message: "Unauthorized" }); } };