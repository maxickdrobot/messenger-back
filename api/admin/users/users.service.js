import registrationRequest from "../../../models/registrationRequest.js";
import { ErrorCodes } from "../../../constants/errorCodes.js";
import { REGISTRATION_REQUEST_STATUS } from "../../../constants/RegistrationRequest.js";

export const getPendingRegistrationRequest = async () => {
    try {
        return await registrationRequest.find({
            status: REGISTRATION_REQUEST_STATUS.PENDING,
        });
    } catch (error) {
        const customError = new Error("Something went wrong...");
        customError.code = ErrorCodes.INTERNAL_SERVER_ERROR;
        throw customError;
    }
};

export const updateRegistrationRequestStatus = async (email, newStatus) => {
    try {
        const request = await webUsersService.getPendingRegistrationRequestByEmail(email);
        request.status = newStatus;
        await request.save();
    } catch (error) {
        const customError = new Error("Failed to reject registration request");
        customError.code = ErrorCodes.INTERNAL_SERVER_ERROR;
        throw customError;
    }
};
