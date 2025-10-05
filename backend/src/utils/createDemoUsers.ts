import prisma from "../prismaClient";
import bcrypt from "bcrypt";
import { Role, JobTitle, Department } from "@prisma/client";

export async function createDemoUsers() {
  try {
    if (process.env.NODE_ENV === "production") {
      console.log("⏭️ Skipping demo user creation in production");
      return;
    }

    console.log("🧩 Checking demo users...");

    const demoUsers = [
      {
        email: "admin@ziggy.com",
        password: "admin123",
        firstName: "Admin",
        lastName: "User",
        role: Role.ADMIN,
        jobTitle: JobTitle.FULLSTACK_DEVELOPER,
        department: Department.ENGINEERING, 
      },
      {
        email: "employee@ziggy.com",
        password: "employee123",
        firstName: "Employee",
        lastName: "Demo",
        role: Role.EMPLOYEE,
        jobTitle: JobTitle.FRONTEND_DEVELOPER,
        department: Department.ENGINEERING, 
        salary: 30000,
      },
      {
        email: "serena.ferraro@ziggy.com",
        password: "password123",
        firstName: "Serena",
        lastName: "Ferraro",
        role: Role.EMPLOYEE,
        jobTitle: JobTitle.BACKEND_DEVELOPER,
        department: Department.ENGINEERING, 
        salary: 40000,
      },
      {
        email: "joe.raccoon@ziggy.com",
        password: "password123",
        firstName: "Joe",
        lastName: "Raccoon",
        role: Role.EMPLOYEE,
        jobTitle: JobTitle.BACKEND_DEVELOPER,
        department: Department.ENGINEERING, 
        salary: 35000,
      },
    ];

    for (const user of demoUsers) {
      const existing = await prisma.user.findUnique({ where: { email: user.email } });

      if (!existing) {
        const hashed = await bcrypt.hash(user.password, 10);
        await prisma.user.create({
          data: {
            email: user.email,
            password: hashed,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            jobTitle: user.jobTitle,
            department: user.department ? (user.department as Department) : null,
            salary: user.salary || null,
          },
        });
        console.log(` Created demo user: ${user.email}`);
      } else {
        console.log(`ℹ Demo user already exists: ${user.email}`);
      }
    }

    console.log(" Demo users ready.");
  } catch (err) {
    console.error(" Error creating demo users:", err);
  }
}
