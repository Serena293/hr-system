import prisma from "../prismaClient";
import bcrypt from "bcrypt";
import { RegisterDTO } from "../dtos/registerDTO";
import { CreateUserDTO } from "../dtos/createUserDTO";

export class AdminService {
  async getAllEmployees() {
    const users = await prisma.user.findMany({
      where: { role: "EMPLOYEE" },
    });

    return users.map((user) => ({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      jobTitle: user.jobTitle,
      role: user.role,
    }));
  }

  async getEmployeeById(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user || user.role !== "EMPLOYEE") {
      throw new Error("Employee not found");
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      jobTitle: user.jobTitle,
      role: user.role,
    };
  }

  async createEmployee(data: CreateUserDTO) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        jobTitle: data.jobTitle,
        role:  data.role ||"EMPLOYEE", 
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

  async updateEmployee(id: number, data: Partial<RegisterDTO>) {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user || user.role !== "EMPLOYEE") {
      throw new Error("Employee not found");
    }

    let updateData: any = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      jobTitle: data.jobTitle,
    };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      jobTitle: updatedUser.jobTitle,
      role: updatedUser.role,
    };
  }

  
  async deleteEmployee(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user || user.role !== "EMPLOYEE") {
      throw new Error("Employee not found");
    }

    await prisma.user.delete({ where: { id } });

    return { message: "Employee deleted successfully" };
  }
}
