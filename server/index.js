import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import { protect } from "./middleware/authMiddleware.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", protect, (req, res) => {
    res.json("succcess");
});

app.use("/auth", authRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/classes", classRoutes);
app.use("/teachers", teacherRoutes);
app.use("/students", studentRoutes);
app.use("/dashboard", dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);

    await connectDB();
});
