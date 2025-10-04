import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isAdminMiddleware } from "../middlewares/isAdmin.middleware";
import { validate } from "../middlewares/validate.middleware";
import { CreateUserSchema } from "../schemas/admin.schema";

const router = Router();
const adminController = new AdminController();

router.get("/employees", authMiddleware, isAdminMiddleware, (req, res) => {
  adminController.listEmployees(req, res);
});

router.get("/employees/:id", authMiddleware, isAdminMiddleware, (req, res) =>
  adminController.getEmployee(req, res)
);

router.post("/users", authMiddleware, isAdminMiddleware, validate(CreateUserSchema), (req, res) =>
  adminController.createUser(req, res)
);

router.put("/employees/:id", authMiddleware, isAdminMiddleware, (req, res) =>
  adminController.updateEmployee(req, res)
);

router.delete("/employees/:id", authMiddleware, isAdminMiddleware, (req, res) =>
  adminController.deleteEmployee(req, res)
);

export default router;
