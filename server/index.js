import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Welcome");
});

app.use("/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);

    await connectDB();
});
