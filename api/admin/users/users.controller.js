import * as usersService from "./users.service.js";
import * as webUsersService from "../../web/users/users.service.js";
import { ErrorCodes } from "../../../constants/errorCodes.js";
import { REGISTRATION_REQUEST_STATUS } from "../../../constants/RegistrationRequest.js";

export const getRegistrationRequests = async (req, res) => {
    try {
        const requests = await usersService.getPendingRegistrationRequest();
        return res.status(200).json({ requests });
    } catch (error) {
        return res.status(500).json({
            error: {
                code: ErrorCodes.INTERNAL_SERVER_ERROR,
                message: "Failed to fetch registration requests",
            },
        });
    }
};

export const approveRegistrationRequest = async (req, res) => {
    const { email } = req.params;
    try {
        const request = await webUsersService.getPendingRegistrationRequestByEmail(email);
        await webUsersService.createUser({
            username: request.username,
            email: request.email,
            password: request.password,
        });
        await usersService.updateRegistrationRequestStatus(
            email,
            REGISTRATION_REQUEST_STATUS.APPROVED
        );
        return res.status(200).json({ message: "User approved and registered successfully" });
    } catch (error) {
        return res.status(500).json({
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to approve registration request",
            },
        });
    }
};

export const rejectRegistrationRequest = async (req, res) => {
    const { email } = req.params;

    try {
        await usersService.updateRegistrationRequestStatus(
            email,
            REGISTRATION_REQUEST_STATUS.REJECTED
        );

        return res.status(200).json({ message: "Request rejected successfully" });
    } catch (error) {
        return res.status(500).json({
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to reject registration request",
            },
        });
    }
};
