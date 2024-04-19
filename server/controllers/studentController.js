import { roles } from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";

// @desc    Get all students
// route    GET /students
// @access  private
const getStudents = async (req, res, next) => {
    try {
        const students = await User.find({ role: roles.Student });
        if (!students) {
            res.status(404);
            throw new Error("No students found.");
        }

        const formattedStudents = students.map((student) => {
            const { firstName, lastName, ...rest } = student._doc;

            const name = `${firstName} ${lastName}`;

            return { ...rest, name };
        });

        res.status(200).json(formattedStudents);
    } catch (error) {
        next(error);
    }
};

// @desc    Get student
// route    GET /students/:studentId
// @access  private
const getStudent = async (req, res, next) => {
    try {
        const studentId = req.params.studentId;

        const student = await User.findById();
        if (!student) {
            res.status(404);
            throw new Error("No students found.");
        }

        const formattedStudents = students.map((student) => {
            const { firstName, lastName, ...rest } = student._doc;

            const name = `${firstName} ${lastName}`;

            return { ...rest, name };
        });

        res.status(200).json(formattedStudents);
    } catch (error) {
        next(error);
    }
};

export { getStudents, getStudent };
