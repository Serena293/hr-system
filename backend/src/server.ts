import express from "express";
import authRoutes from "./routes/auth.routes";
import employeeRoutes from "./routes/employee.routes";


const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json());


app.use("/auth", authRoutes);
app.use("/employee", employeeRoutes);


app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
