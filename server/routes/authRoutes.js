import express from "express";
import {
    authLogin,
    authSignUp,
    authRefresh,
    authLogout,
    getProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/sign-in", authLogin);
router.post("/sign-up", authSignUp);
router.get("/refresh", authRefresh);
router.post("/logout", authLogout);

router.get("/me", protect, getProfile);

export default router;
