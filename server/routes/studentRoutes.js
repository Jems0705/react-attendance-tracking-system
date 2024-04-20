import express from "express";
import {
    getStudents,
    getMyStudents,
    getStudent,
} from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getStudents);
router.get("/my-students", getMyStudents);
router.get("/:studentId", getStudent);

export default router;
