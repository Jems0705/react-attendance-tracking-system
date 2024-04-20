// @desc    Get all data that are clocked in today
// route    GET /dashboard/clock-in

import { roles } from "../middleware/authMiddleware";
import Attendance from "../models/attendanceModel";
import Class from "../models/classModel";

// @access  private
const getClockedIn = async (req, res, next) => {
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
                    })
                        .select("-__v")
                        .populate([
                            {
                                path: "student",
                                select: "_id firstName lastName",
                            },
                            {
                                path: "class",
                                select: "_id name",
                            },
                        ]);

                    console.log("attendance", attendance);

                    allAttendance = allAttendance.concat(attendance);
                }
            }

            console.log("allAttendance", allAttendance);
            res.status(200).json(allAttendance);
        }
    } catch (error) {
        next(error);
    }
};

export { getClockedIn };
