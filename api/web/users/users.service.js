import User from "../../../models/users.js";
import { ErrorCodes } from "../../../constants/errorCodes.js";

export const addUser = async (userData) => {
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
        const customError = new Error("Something went wrong...");
        customError.code = ErrorCodes.INTERNAL_SERVER_ERROR;
        throw customError;
    }
};
