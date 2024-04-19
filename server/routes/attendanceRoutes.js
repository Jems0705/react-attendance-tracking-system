import express from "express";

import { checkRole, protect } from "../middleware/authMiddleware.js";
import { getAttendance } from "../controllers/attendanceController.js";

const router = express.Router();

router.use(protect);

router.get("/", getAttendance);

export default router;
