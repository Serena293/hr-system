import { Request, Response } from "express";
import { AdminService } from "../services/admin.service";
import { CreateUserDTO } from "../schemas/admin.schema";

const adminService = new AdminService();

export class AdminController {

  async listEmployees(req: Request, res: Response) {
    try {
      const employees = await adminService.getAllEmployees();
      return res.status(200).json(employees);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getEmployee(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const employee = await adminService.getEmployeeById(id);
      return res.status(200).json(employee);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }


  async createUser(req: Request, res: Response) {
    try {
      const data: CreateUserDTO = req.body;
      const newUser = await adminService.createEmployee(data);
      return res.status(201).json(newUser);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async updateEmployee(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updatedUser = await adminService.updateEmployee(id, req.body);
      return res.status(200).json(updatedUser);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async deleteEmployee(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const result = await adminService.deleteEmployee(id);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
