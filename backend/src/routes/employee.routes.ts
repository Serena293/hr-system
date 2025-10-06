/**
 * employee.routes.ts
 * Defines routes accessible to authenticated employees.
 * Read-only profile endpoint.
 */

import { Router } from "express";
import { EmployeeController } from "../controllers/employee.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const employeeController = new EmployeeController();

router.get("/profile", authMiddleware, (req, res) => employeeController.profile(req, res));

export default router;
