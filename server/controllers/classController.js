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

        if (req.userRole === roles.Student) {
            const classes = await Class.find({ students: user._id });

            res.status(200).json(classes);
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get class
// route    GET /classes/:classId
// @access  private
const getClass = async (req, res, next) => {
    try {
        const user = req.user;
        const classId = req.params.classId;

        if (req.userRole === roles.Teacher) {
            const _class = await Class.findOne({
                _id: classId,
                teacher: user._id,
            });

            if (!_class) {
                res.status(404);
                throw new Error("No class found");
            }

            res.status(200).json(_class);
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
        const { name } = req.body;

        if (req.userRole === roles.Teacher) {
            const classes = await Class.find({ name });

            if (classes && classes.length > 0) {
                res.status(400);
                throw new Error("Name is already taken.");
            }

            const newClasses = await Class.create({
                ...req.body,
                teacher: user._id,
            });

            if (!newClasses) {
                throw new Error("Failed to create class.");
            }

            res.status(201).json({
                message: `Class ${newClasses.name} has been created successfully.`,
            });
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Update class
// route    PUT /classes/:classId
// @access  private
const updateClass = async (req, res, next) => {
    try {
        const classId = req.params.classId;
        const { name } = req.body;

        if (req.userRole === roles.Teacher) {
            const classes = await Class.find({ name });

            const isDuplicate = classes.filter(
                (_class) => _class._id.toString() !== classId
            );

            if (isDuplicate && isDuplicate.length > 0) {
                res.status(400);
                throw new Error("Name is already taken.");
            }

            const updatedClass = await Class.findOneAndUpdate(
                { _id: classId },
                { ...req.body },
                { new: true }
            );

            if (!updatedClass) {
                res.status(400);
                throw new Error("Failed to update class.");
            }

            res.status(200).json({
                message: `Class ${updatedClass.name} has been updated successfully.`,
            });
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete class
// route    DELETE /classes/:classId
// @access  private
const deleteClass = async (req, res, next) => {
    try {
        res.json("delete");
    } catch (error) {
        next(error);
    }
};

export { getClasses, getClass, createClass, updateClass, deleteClass };
