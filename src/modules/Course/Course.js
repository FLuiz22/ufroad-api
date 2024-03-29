import { Schema, model } from "mongoose";

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    classes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Class",
            required: false,
            default: [],
        },
    ],
    minimumPeriods: {
        type: Number,
        required: true,
        default: 9,
    },
});

const Course = model("Course", CourseSchema);

export default Course;
