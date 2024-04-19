import { roles } from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";

// @desc    Get all teachers
// route    GET /teachers
// @access  private
const getTeachers = async (req, res, next) => {
    try {
        const teachers = await User.find({ role: roles.Teacher }).select(
            "-__v -password"
        );

        if (!teachers) {
            res.status(404);
            throw new Error("No teachers found.");
        }

        const formattedTeachers = teachers.map((teacher) => {
            const { firstName, lastName, ...rest } = teacher._doc;

            const name = `${firstName} ${lastName}`;

            return { ...rest, name };
        });

        res.status(200).json(formattedTeachers);
    } catch (error) {
        next(error);
    }
};

export { getTeachers };
