import express from "express";
import {
    getClasses,
    createClass,
    getClass,
    updateClass,
    deleteClass,
} from "../controllers/classController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getClasses);
router.get("/:classId", getClass);
router.post("/", createClass);
router.put("/:classId", updateClass);
router.delete("/:classId", deleteClass);

export default router;
