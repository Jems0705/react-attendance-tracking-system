import express from "express";
import { getClasses, createClass } from "../controllers/classController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getClasses);
router.post("/", createClass);

export default router;
