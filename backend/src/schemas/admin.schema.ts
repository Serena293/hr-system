import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  jobTitle: z.enum(["FRONTEND_DEVELOPER", "BACKEND_DEVELOPER", "FULLSTACK_DEVELOPER"]),
  role: z.enum(["ADMIN", "EMPLOYEE"]),
  department: z.enum(["HR", "FINANCE", "ENGINEERING", "MARKETING"]).optional(),
  salary: z.number().positive().optional(),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
