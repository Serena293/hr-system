"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserSchema = void 0;
const zod_1 = require("zod");
exports.CreateUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    jobTitle: zod_1.z.enum(["FRONTEND_DEVELOPER", "BACKEND_DEVELOPER", "FULLSTACK_DEVELOPER"]),
    role: zod_1.z.enum(["ADMIN", "EMPLOYEE"]),
    department: zod_1.z.enum(["HR", "FINANCE", "ENGINEERING", "MARKETING"]).optional(),
    salary: zod_1.z.number().positive().optional(),
});
