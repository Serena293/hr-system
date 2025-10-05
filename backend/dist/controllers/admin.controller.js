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
exports.AdminController = void 0;
const admin_service_1 = require("../services/admin.service");
const adminService = new admin_service_1.AdminService();
class AdminController {
    listEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield adminService.getAllEmployees();
                return res.status(200).json(employees);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    getEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const employee = yield adminService.getEmployeeById(id);
                return res.status(200).json(employee);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const newUser = yield adminService.createEmployee(data);
                return res.status(201).json(newUser);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    updateEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const updatedUser = yield adminService.updateEmployee(id, req.body);
                return res.status(200).json(updatedUser);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    deleteEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const result = yield adminService.deleteEmployee(id);
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.AdminController = AdminController;
