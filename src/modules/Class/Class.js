import { Schema, model } from "mongoose";

const ClassSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    // cursos

    credits: {
        type: Number,
        required: true,
    },

    requirements: [
        {
            type: Schema.Types.ObjectId,
            required: true,
        },
    ],

    category: {
        type: String,
        enum: ["Obrigatória", "Optativa"],
        required: true,
    },

    content: [
        {
            type: String,
            required: false,
        },
    ],
});

const Class = model("Class", ClassSchema);
export default Class;
