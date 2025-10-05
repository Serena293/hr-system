"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_1 = require("../controllers/employee.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const employeeController = new employee_controller_1.EmployeeController();
router.get("/profile", auth_middleware_1.authMiddleware, (req, res) => employeeController.profile(req, res));
exports.default = router;
