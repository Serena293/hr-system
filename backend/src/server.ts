import express from "express";
import authRoutes from "./routes/auth.routes";
import employeeRoutes from "./routes/employee.routes";
import adminRoutes from "./routes/admin.routes";
import cors from "cors";
import { createDemoUsers } from "./utils/createDemoUsers";

const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json());

app.use(cors({
   origin: [
      "http://localhost:5173",
      "https://hr-system-fe.onrender.com",
      "http://localhost:3000"
    ],
  credentials: true
}));

app.use("/auth", authRoutes);
app.use("/employee", employeeRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, async () => {
  console.log(` Server is running on http://localhost:${PORT}`);
  await createDemoUsers();
});
