import mongoose from "mongoose";
import { REGISTRATION_REQUEST_STATUS } from "../constants/RegistrationRequest.js";

const registrationRequestSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        message: {
            type: String,
        },
        status: {
            type: String,
            enum: Object.values(REGISTRATION_REQUEST_STATUS),
            default: REGISTRATION_REQUEST_STATUS.PENDING,
        },
    },
    {
        timestamps: true,
    }
);
registrationRequestSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });

export default mongoose.model(
    "RegistrationRequest",
    registrationRequestSchema,
    "RegistrationRequests"
);
