import mongoose, { Schema } from "mongoose";

const attendanceSchema = new mongoose.Schema(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        class: {
            type: Schema.Types.ObjectId,
            ref: "Class",
            required: true,
        },
        clockIn: { type: Date },
        clockOut: { type: Date },
    },
    {
        timestamps: true,
    }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
