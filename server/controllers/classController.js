import { roles } from "../middleware/authMiddleware.js";
import Attendance from "../models/attendanceModel.js";
import Class from "../models/classModel.js";

// @desc    Get all classes
// route    GET /classes
// @access  private
const getClasses = async (req, res, next) => {
    try {
        const user = req.user;
        if (req.userRole === roles.Teacher) {
            const classes = await Class.find({ teacher: user._id });

            res.status(200).json(classes);
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Create new class
// route    POST /classes
// @access  private
const createClass = async (req, res, next) => {
    try {
        const user = req.user;

        if (req.userRole === roles.Teacher) {
            const classes = await Class.create({
                ...req.body,
                teacher: user._id,
            });

            if (!classes) {
                throw new Error("Failed to create class.");
            }

            res.status(201).json({
                message: `Class ${classes.name} has been created successfully.`,
            });
        }
    } catch (error) {
        next(error);
    }
};

export { getClasses, createClass };
