import express from "express";

import { checkRole, protect } from "../middleware/authMiddleware.js";
import {
    getAttendance,
    clockInAttendance,
    clockOutAttendance,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.use(protect);

router.get("/", getAttendance);
router.post("/clock-in", clockInAttendance);
router.post("/clock-out", clockOutAttendance);

export default router;
