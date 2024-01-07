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

    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const User = model("User", UserSchema);

export default User;
