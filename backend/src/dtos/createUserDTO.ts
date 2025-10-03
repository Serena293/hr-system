import { JobTitle, Role, Department } from "@prisma/client";

export interface CreateUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  jobTitle: JobTitle;
  role: Role; 
  department?: Department;
  salary?: number;
}
