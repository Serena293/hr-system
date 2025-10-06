/**
 * server.ts
 * Entry point of the HR System backend application.
 * Configures middleware, routes, and initializes demo users on startup.
 */

import express from "express";
import authRoutes from "./routes/auth.routes";
import employeeRoutes from "./routes/employee.routes";
import adminRoutes from "./routes/admin.routes";
import cors from "cors";
import { createDemoUsers } from "./utils/createDemoUsers";

const app = express();
const PORT = process.env.PORT || 8000;

// Parse incoming JSON requests
app.use(express.json());

//Cors configuration: allows frontend access from local and deployed environments.
app.use(cors({
   origin: [
      "http://localhost:5173",
      "https://hr-system-frontend-bhcj.onrender.com",
      "http://localhost:3000"
    ],
  credentials: true
}));

//route registration
app.use("/auth", authRoutes);
app.use("/employee", employeeRoutes);
app.use("/admin", adminRoutes);

//start server and create demo users
app.listen(PORT, async () => {
  console.log(` Server is running on http://localhost:${PORT}`);
  await createDemoUsers();
});
