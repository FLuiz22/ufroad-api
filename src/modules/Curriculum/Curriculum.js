import { Schema, model } from "mongoose";

const CurriculumSchema = new Schema({
    yearImplemented: {
        type: Number,
        required: true,
    },
    
    // classes: {
    //     // lista de disciplinas
    // },

    // course: { ... },
});

const Curriculum = model("Curriculum", CurriculumSchema);

export default Curriculum;