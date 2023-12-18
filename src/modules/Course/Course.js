import { Schema, model } from "mongoose";

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    curriculum: [
        {
            type: Schema.Types.ObjectId,
            ref: "Curriculum",
            required: false,
            default: [],
        },
    ],
    sclass: [
        {
            type: Schema.Types.ObjectId,
            ref: "SClass",
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
