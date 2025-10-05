"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const employee_service_1 = require("../services/employee.service");
const library_1 = require("@prisma/client/runtime/library");
const employeeService = new employee_service_1.EmployeeService();
class EmployeeController {
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                const user = yield employeeService.getProfile(req.user.id);
                return res.status(200).json(user);
            }
            catch (error) {
                console.error("Profile error:", error);
                if (error instanceof library_1.PrismaClientKnownRequestError) {
                    return res.status(500).json({ message: "Database error" });
                }
                return res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.EmployeeController = EmployeeController;
