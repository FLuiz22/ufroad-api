import { Schema, model } from "mongoose";

const CurriculumSchema = new Schema({
    yearImplemented: {
        type: Number,
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

    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
});

const Curriculum = model("Curriculum", CurriculumSchema);

export default Curriculum;
