import User from "../../../models/users.js";
import RegistrationRequest from "../../../models/registrationRequest.js";
import { ErrorCodes } from "../../../constants/errorCodes.js";
import { REGISTRATION_REQUEST_STATUS } from "../../../constants/RegistrationRequest.js";

export const createRegistrationRequest = async (userData) => {
    try {
        const newUser = new RegistrationRequest(userData);
        await newUser.save();
        return newUser;
    } catch (error) {
        const customError = new Error("Error sending request");
        customError.code = ErrorCodes.INTERNAL_SERVER_ERROR;
        throw customError;
    }
};

export const createUser = async (userData) => {
    try {
        const newUser = new User(userData);
        await newUser.save();
        return newUser;
    } catch (error) {
        const customError = new Error("Error adding user");
        customError.code = ErrorCodes.INTERNAL_SERVER_ERROR;
        throw customError;
    }
};

export const getUserByEmail = async (email) => {
    try {
        return await User.findOne({ email });
    } catch (error) {
        const customError = new Error("Error getting user...");
        customError.code = ErrorCodes.INTERNAL_SERVER_ERROR;
        throw customError;
    }
};

export const getPendingRegistrationRequestByEmail = async (email) => {
    try {
        return await RegistrationRequest.findOne({
            email,
            status: REGISTRATION_REQUEST_STATUS.PENDING,
        });
    } catch (error) {
        const customError = new Error("Error getting request...");
        customError.code = ErrorCodes.INTERNAL_SERVER_ERROR;
        throw customError;
    }
};
