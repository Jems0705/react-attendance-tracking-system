import { roles } from "../middleware/authMiddleware.js";
import Class from "../models/classModel.js";
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

// @desc    Get all my students
// route    GET /students/my-students
// @access  private
const getMyStudents = async (req, res, next) => {
    try {
        const user = req.user;

        if (req.userRole === roles.Teacher) {
            const classStudents = await Class.find({ teacher: user._id });

            if (!classStudents) {
                res.status(404);
                throw new Error("No students found.");
            }

            let allStudents = [];

            for (const classStudent of classStudents) {
                for (const student of classStudent.students) {
                    const studentInfo = await User.findOne({
                        role: roles.Student,
                        _id: student,
                    }).select("-__v -password");

                    allStudents = allStudents.concat(studentInfo);
                }
            }

            const formattedStudents = allStudents.map((student) => {
                const { firstName, lastName, ...rest } = student._doc;

                const name = `${firstName} ${lastName}`;

                return { ...rest, name };
            });

            // Filter out duplicates
            const students = Object.values(
                formattedStudents.reduce((unique, item) => {
                    if (!unique[item._id]) {
                        unique[item._id] = item;
                    }
                    return unique;
                }, {})
            );

            res.status(200).json(students);
        }
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

        const student = await User.findById(studentId).select("-__v -password");
        if (!student) {
            res.status(404);
            throw new Error("No student found.");
        }

        const { firstName, lastName, ...rest } = student.toObject();

        const name = `${firstName} ${lastName}`;

        res.status(200).json({ ...rest, name });
    } catch (error) {
        next(error);
    }
};

export { getStudents, getMyStudents, getStudent };
