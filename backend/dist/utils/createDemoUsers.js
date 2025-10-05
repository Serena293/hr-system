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
exports.createDemoUsers = createDemoUsers;
const prismaClient_1 = __importDefault(require("../prismaClient"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
function createDemoUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (process.env.NODE_ENV === "production") {
                console.log("⏭️ Skipping demo user creation in production");
                return;
            }
            console.log("🧩 Checking demo users...");
            const demoUsers = [
                {
                    email: "admin@ziggy.com",
                    password: "admin123",
                    firstName: "Admin",
                    lastName: "User",
                    role: client_1.Role.ADMIN,
                    jobTitle: client_1.JobTitle.FULLSTACK_DEVELOPER,
                    department: client_1.Department.ENGINEERING,
                },
                {
                    email: "employee@ziggy.com",
                    password: "employee123",
                    firstName: "Employee",
                    lastName: "Demo",
                    role: client_1.Role.EMPLOYEE,
                    jobTitle: client_1.JobTitle.FRONTEND_DEVELOPER,
                    department: client_1.Department.ENGINEERING,
                    salary: 30000,
                },
                {
                    email: "serena.ferraro@ziggy.com",
                    password: "password123",
                    firstName: "Serena",
                    lastName: "Ferraro",
                    role: client_1.Role.EMPLOYEE,
                    jobTitle: client_1.JobTitle.BACKEND_DEVELOPER,
                    department: client_1.Department.ENGINEERING,
                    salary: 40000,
                },
                {
                    email: "joe.raccoon@ziggy.com",
                    password: "password123",
                    firstName: "Joe",
                    lastName: "Raccoon",
                    role: client_1.Role.EMPLOYEE,
                    jobTitle: client_1.JobTitle.BACKEND_DEVELOPER,
                    department: client_1.Department.ENGINEERING,
                    salary: 35000,
                },
            ];
            for (const user of demoUsers) {
                const existing = yield prismaClient_1.default.user.findUnique({ where: { email: user.email } });
                if (!existing) {
                    const hashed = yield bcrypt_1.default.hash(user.password, 10);
                    yield prismaClient_1.default.user.create({
                        data: {
                            email: user.email,
                            password: hashed,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            role: user.role,
                            jobTitle: user.jobTitle,
                            department: user.department ? user.department : null,
                            salary: user.salary || null,
                        },
                    });
                    console.log(` Created demo user: ${user.email}`);
                }
                else {
                    console.log(`ℹ Demo user already exists: ${user.email}`);
                }
            }
            console.log(" Demo users ready.");
        }
        catch (err) {
            console.error(" Error creating demo users:", err);
        }
    });
}
