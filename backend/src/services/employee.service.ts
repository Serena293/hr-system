import { JobTitle } from "@prisma/client";
import prisma from "../prismaClient";

export class EmployeeService {
    async getProfile(id: number) {
        const user = await prisma.user.findUnique({
            where: { id: id },
});
    if (!user) {
        throw new Error("User not found");
    }

     return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      jobTitle: user.jobTitle,
      role: user.role,
    };
}}