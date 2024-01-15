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
});

const Curriculum = model("Curriculum", CurriculumSchema);

export default Curriculum;