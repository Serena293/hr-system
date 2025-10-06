/**
 * auth.service.ts
 * Handles business logic for user authentication and login.
 * Validates credentials, compares passwords, and generates JWT tokens.
 */

import { LoginDTO } from "../schemas/login.schema";
import prisma from "../prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export class AuthService {

  async login(credetials: LoginDTO) {
    const user = await prisma.user.findUnique({
      where: { email: credetials.email },
    });
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(
      credetials.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return { token, user: { id: user.id, email: user.email, role: user.role } };
}
}
