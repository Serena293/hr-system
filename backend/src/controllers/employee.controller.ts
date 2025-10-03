import { Response } from "express";
import { EmployeeService} from "../services/employee.service";
import { AuthRequest } from "../middlewares/auth.middleware";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const employeeService = new EmployeeService();

export class EmployeeController {
  async profile(req: AuthRequest, res: Response) {
    try{
        if(!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
    }    

   const user = await employeeService.getProfile(req.user.id);
   return res.status(200).json(user);
    } catch (error: any) {
    console.error("Profile error:", error);
    if (error instanceof PrismaClientKnownRequestError) {
        return res.status(500).json({ message: "Database error" });
    }
    return res.status(400).json({ message: error.message });
}

}}