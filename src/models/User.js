import { Schema } from "mongoose";
import validator from "validator";
import mongoose from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please fill a valid email address"],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
    },
    status: {
        type: Boolean,
        default: true,
    },
    lastLogin: {
        type: Date,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
},
    { timestamps: true, versionKey: false });

export default mongoose.model("User", UserSchema);