import express from "express";
import authRoutes from "./routes/auth.routes";
import employeeRoutes from "./routes/employee.routes";
import adminRoutes from "./routes/admin.routes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/auth", authRoutes);
app.use("/employee", employeeRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
