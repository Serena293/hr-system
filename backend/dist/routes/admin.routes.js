"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const isAdmin_middleware_1 = require("../middlewares/isAdmin.middleware");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const admin_schema_1 = require("../schemas/admin.schema");
const router = (0, express_1.Router)();
const adminController = new admin_controller_1.AdminController();
router.get("/employees", auth_middleware_1.authMiddleware, isAdmin_middleware_1.isAdminMiddleware, (req, res) => {
    adminController.listEmployees(req, res);
});
router.get("/employees/:id", auth_middleware_1.authMiddleware, isAdmin_middleware_1.isAdminMiddleware, (req, res) => adminController.getEmployee(req, res));
router.post("/users", auth_middleware_1.authMiddleware, isAdmin_middleware_1.isAdminMiddleware, (0, validate_middleware_1.validate)(admin_schema_1.CreateUserSchema), (req, res) => adminController.createUser(req, res));
router.put("/employees/:id", auth_middleware_1.authMiddleware, isAdmin_middleware_1.isAdminMiddleware, (req, res) => adminController.updateEmployee(req, res));
router.delete("/employees/:id", auth_middleware_1.authMiddleware, isAdmin_middleware_1.isAdminMiddleware, (req, res) => adminController.deleteEmployee(req, res));
exports.default = router;
