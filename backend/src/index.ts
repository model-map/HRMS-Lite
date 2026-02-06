import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import connectDb from "./config/db.js";
import employeesRouter from "./routes/employees.js";
import attendanceRouter from "./routes/attendance.js";
dotenv.config();

const app = express();

// Global middlware for serving static files
app.use(express.static(path.resolve(process.cwd(), "dist/public")));

// Global middleware for body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to DB
connectDb();

app.get("/", (req, res) => res.json({ message: "Hello world" }));

// OTHER ROUTES
app.use("/api/v1/employees", employeesRouter);
app.use("/api/v1/attendance", attendanceRouter);

// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
