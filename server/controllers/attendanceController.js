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
            const classes = await Class.find({ teacher: user._id }).populate(
                "students"
            );

            let allAttendance = [];

            for (const _class of classes) {
                for (const student of _class.students) {
                    const attendance = await Attendance.find({
                        student: student._id,
                        class: _class._id,
                    });

                    console.log("attendance", attendance);

                    allAttendance = allAttendance.concat(attendance);
                }
            }

            console.log("allAttendance", allAttendance);

            // if (!classId) {
            //     res.status(404);
            //     throw new Error("No class found");
            // }

            // const attendance = await Attendance.find({});
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

// @desc    Create or update attendance for student (in)
// route    POST /attendance/clock-in
// @access  private
const clockInAttendance = async (req, res, next) => {
    try {
        const user = req.user;

        if (req.userRole === roles.Teacher) {
        }
        res.status(200).json(req.body);
    } catch (error) {
        next(error);
    }
};

// @desc    Create or update attendance for student (out)
// route    POST /attendance/clock-out
// @access  private
const clockOutAttendance = async (req, res, next) => {
    try {
        const user = req.user;

        if (req.userRole === roles.Teacher) {
        }

        console.log(req.body);
        res.status(200).json(req.body);
    } catch (error) {
        next(error);
    }
};

export { getAttendance, clockInAttendance, clockOutAttendance };
