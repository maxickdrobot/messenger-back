import { ErrorCodes } from "../../../constants/errorCodes.js";
import { REGISTRATION_REQUEST_STATUS } from "../../../constants/RegistrationRequest.js";
import * as webUsersService from "../../web/users/users.service.js";

export const checkUserRegistrationRequestExist = async (req, res, next) => {
    const { email } = req.params;
    try {
        const request = await webUsersService.getPendingRegistrationRequestByEmail(email);
        if (!request || request.status !== REGISTRATION_REQUEST_STATUS.PENDING) {
            return res.status(400).json({
                error: {
                    code: ErrorCodes.REQUEST_ALREADY_EXISTS,
                    message: "Request not found or already processed",
                },
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            error: {
                code: ErrorCodes.INTERNAL_SERVER_ERROR,
                message: "Something went wrong",
            },
        });
    }
};
