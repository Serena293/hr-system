// auth.controller.ts — contains endpoints for authentication and user login logic

import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {
 
  async login(req: Request, res: Response) {
    try {
      const result = await authService.login(req.body);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
