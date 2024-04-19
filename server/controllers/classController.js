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
            console.log("classes", classes);
        }

        res.status(200).json("usccess");
    } catch (error) {
        next(error);
    }
};

// @desc    Create new class
// route    POST /classes
// @access  private
const createClass = async (req, res, next) => {
    try {
        console.log(req.body);
        const user = req.user;
        if (req.userRole === roles.Teacher) {
            const classes = await Class.create({
                ...req.body,
                teacher: user._id,
            });
            console.log("classes", classes);
        }

        res.status(200).json("usccess");
    } catch (error) {
        next(error);
    }
};

export { getClasses, createClass };
