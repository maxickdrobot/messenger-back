const mongoose = require("mongoose");
const USER_ROLES = require("../constants/userRoles");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            enum: Object.values(USER_ROLES),
            default: USER_ROLES.USER,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema, "users");
