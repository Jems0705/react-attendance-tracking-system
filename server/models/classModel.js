import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Class = mongoose.model("Class", classSchema);

export default Class;
