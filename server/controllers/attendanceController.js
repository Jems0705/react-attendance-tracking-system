import { roles } from "../middleware/authMiddleware.js";
import Attendance from "../models/attendanceModel.js";
import Class from "../models/classModel.js";

import { format } from "date-fns";

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

// @desc    Create or update attendance for student (in)
// route    POST /attendance/clock-in
// @access  private
const clockInAttendance = async (req, res, next) => {
    try {
        const user = req.user;
        const student = JSON.parse(req.body.student);
        const classId = req.body.classId;

        if (req.userRole === roles.Teacher) {
            const _class = await Class.findById(classId);

            // check if the user is assigned on the class
            if (_class.teacher.toString() !== user._id.toString()) {
                res.status(400);
                throw new Error(
                    "You are not the assigned teacher on this class."
                );
            }

            // check if the student is enrolled in the class
            if (!_class.students.includes(student._id)) {
                res.status(400);
                throw new Error("The student is not enrolled in this class.");
            }

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);

            const studentAttendance = await Attendance.findOne({
                student: student._id,
                class: classId,
                createdAt: {
                    $gte: today,
                    $lt: tomorrow,
                },
            });

            console.log("atte", studentAttendance);

            // check if the student is already clocked in.
            if (studentAttendance?.clockIn) {
                res.status(400);
                throw new Error(
                    "The student is already clocked in on this class today."
                );
            }

            // create a attendance w/ date and time of clock in
            const newAttendance = await Attendance.create({
                class: classId,
                student: student._id,
                clockIn: new Date(),
            });

            res.status(200).json({ message: "Clock in success." });
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Update attendance for student (out)
// route    POST /attendance/clock-out
// @access  private
const clockOutAttendance = async (req, res, next) => {
    try {
        const user = req.user;
        const student = JSON.parse(req.body.student);
        const classId = req.body.classId;

        if (req.userRole === roles.Teacher) {
            const _class = await Class.findById(classId);

            // check if the user is assigned on the class
            if (_class.teacher.toString() !== user._id.toString()) {
                res.status(400);
                throw new Error(
                    "You are not the assigned teacher on this class."
                );
            }

            // check if the student is enrolled in the class
            if (!_class.students.includes(student._id)) {
                res.status(400);
                throw new Error("The student is not enrolled in this class.");
            }

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);

            const studentAttendance = await Attendance.findOne({
                student: student._id,
                class: classId,
                createdAt: {
                    $gte: today,
                    $lt: tomorrow,
                },
            });

            // time format(studentAttendance.clockIn, "h:mm:ss aaa")

            if (!studentAttendance?.clockIn) {
                res.status(400);
                throw new Error(
                    "The student cannot clock out without clocking in."
                );
            }

            if (studentAttendance?.clockOut) {
                res.status(400);
                throw new Error(
                    "The student is already clocked out on this class today."
                );
            }

            const updateAttendance = await Attendance.findOneAndUpdate(
                {
                    student: student._id,
                    class: classId,
                    createdAt: {
                        $gte: today,
                        $lt: tomorrow,
                    },
                },
                { clockOut: new Date() }
            );

            res.status(200).json({ message: "Clock out success." });
        }
    } catch (error) {
        next(error);
    }
};

export { getAttendance, clockInAttendance, clockOutAttendance };
