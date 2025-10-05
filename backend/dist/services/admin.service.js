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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AdminService {
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prismaClient_1.default.user.findMany();
            return users.map((user) => ({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                jobTitle: user.jobTitle,
                role: user.role,
                salary: user.salary,
                department: user.department,
            }));
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prismaClient_1.default.user.findUnique({ where: { id } });
            if (!user || user.role !== "EMPLOYEE") {
                throw new Error("Employee not found");
            }
            return {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                jobTitle: user.jobTitle,
                role: user.role,
                salary: user.salary,
                department: user.department,
            };
        });
    }
    createEmployee(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield prismaClient_1.default.user.findUnique({
                where: { email: data.email },
            });
            if (existingUser) {
                throw new Error("Email already exists");
            }
            const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
            const newUser = yield prismaClient_1.default.user.create({
                data: {
                    email: data.email,
                    password: hashedPassword,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    jobTitle: data.jobTitle,
                    role: data.role || "EMPLOYEE",
                    department: data.department || null,
                    salary: data.salary || null,
                },
            });
            return {
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                jobTitle: newUser.jobTitle,
                role: newUser.role,
                department: newUser.department,
                salary: newUser.salary,
            };
        });
    }
    updateEmployee(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prismaClient_1.default.user.findUnique({ where: { id } });
            if (!user || user.role !== "EMPLOYEE") {
                throw new Error("Employee not found");
            }
            let updateData = {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                jobTitle: data.jobTitle,
                role: data.role,
                department: data.department,
                salary: data.salary,
            };
            if (data.password) {
                updateData.password = yield bcrypt_1.default.hash(data.password, 10);
            }
            const updatedUser = yield prismaClient_1.default.user.update({
                where: { id },
                data: updateData,
            });
            return {
                id: updatedUser.id,
                email: updatedUser.email,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                jobTitle: updatedUser.jobTitle,
                role: updatedUser.role,
                department: updatedUser.department,
                salary: updatedUser.salary,
            };
        });
    }
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prismaClient_1.default.user.findUnique({ where: { id } });
            if (!user || user.role !== "EMPLOYEE") {
                throw new Error("Employee not found");
            }
            yield prismaClient_1.default.user.delete({ where: { id } });
            return { message: "Employee deleted successfully" };
        });
    }
}
exports.AdminService = AdminService;
