import { roles } from "../middleware/authMiddleware.js";
import Attendance from "../models/attendanceModel.js";
import Class from "../models/classModel.js";

// @desc    Get all attendance
// route    GET /attendance
// @access  private
const getAttendance = async (req, res, next) => {
    try {
        const user = req.user;

        if (req.userRole === roles.Teacher) {
            const classId = await Class.find({ teacher: user._id }).select(
                "_id"
            );

            console.log("class id", classId);

            if (!classId) {
                res.status(404);
                throw new Error("No class found");
            }

            const attendance = await Attendance.find({});
        }
        // const { email, password } = req.body;

        // const foundUser = await User.findOne({
        //     $or: [{ email: email }, { prn: email }],
        // });

        // if (!foundUser) {
        //     res.status(401);
        //     throw new Error("Invalid email or password.");
        // }

        // if (!(await foundUser.matchPassword(password))) {
        //     res.status(401);
        //     throw new Error("Invalid email or password.");
        // }

        // const { accessToken } = generateToken(res, {
        //     user: { id: foundUser._id, email: foundUser.email },
        // });

        res.status(200).json("usccess");
    } catch (error) {
        next(error);
    }
};

export { getAttendance };
