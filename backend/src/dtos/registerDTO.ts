import { JobTitle } from "@prisma/client";


export interface RegisterDTO {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  jobTitle: JobTitle;
}