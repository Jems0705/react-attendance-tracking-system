import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const roles = {
    Admin: "admin",
    Teacher: "teacher",
    Student: "student",
};

const protect = async (req, res, next) => {
    try {
        const authHeader =
            req.headers.authorization || req.headers.Authorization;

        if (!authHeader) {
            res.status(401);
            throw new Error("Unauthorized.");
        }

        if (!authHeader.startsWith("Bearer ")) {
            res.status(401);
            throw new Error("Unauthorized.");
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            res.status(401);
            throw new Error("Unauthorized.");
        }

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

        req.user = await User.findById(decoded.user.id).select(
            "-password -__v"
        );

        next();
    } catch (error) {
        next(error);
    }
};

const checkRole = (role) => {
    return async (req, res, next) => {
        try {
            const userRole = req.user.role;

            if (userRole === role || userRole === roles.Admin) {
                next();
            }

            res.status(403);
            throw new Error("Forbidden.");
        } catch (err) {
            next(err);
        }
    };
};

export { protect, checkRole, roles };
