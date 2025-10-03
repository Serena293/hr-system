import { LoginDTO } from "../dtos/loginDTO";
import { RegisterDTO } from "../dtos/registerDTO";
import prisma from "../prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JobTitle } from "@prisma/client";

export class AuthService {
  async register(userData: RegisterDTO) {
    if (userData.password !== userData.confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new Error("Email already exists");
    }
     console.log("JobTitle enum:", JobTitle);
    console.log("Object.values(JobTitle):", Object.values(JobTitle));
    console.log("Received jobTitle:", userData.jobTitle);

     const validJobTitles = [JobTitle.FRONTEND_DEVELOPER, JobTitle.BACKEND_DEVELOPER, JobTitle.FULLSTACK_DEVELOPER];
    if (!validJobTitles.includes(userData.jobTitle)) {
        throw new Error("Invalid job title");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        jobTitle: userData.jobTitle ,
      },
    });

    return {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      jobTitle: newUser.jobTitle,
      role: newUser.role,
    };
  }

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
