import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // course: { ... }
    role: {
        type: String,
        // Talvez administrador deveria ser um boolean?
        enum: ["Estudante", "Administrador"],
        required: true,
        default: "Estudante",
    },
});

const User = model("User", UserSchema);

export default User;
