import passport from "passport";
import * as usersService from "./users.service.js";
import * as validationUtil from "../../../utils/validations.util.js";
import { ErrorCodes } from "../../../constants/errorCodes.js";

export const validateUser = (req, res, next) => {
    return validationUtil
        .createUserValidation(req.body)
        .then((data) => {
            req.body = data;
            next();
        })
        .catch((error) => {
            return res.status(400).json({
                error: {
                    code: ErrorCodes.VALIDATION_ERROR,
                    message: "Validation failed",
                    details: error.details,
                },
            });
        });
};

export const checkUserExist = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await usersService.getUserByEmail(email);

        if (user) {
            return res.status(400).json({
                error: {
                    code: ErrorCodes.USER_ALREADY_EXISTS,
                    message:
                        "An account with this email already exists. Try another email or login.",
                },
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            error: {
                code: ErrorCodes.INTERNAL_SERVER_ERROR,
                message: "Server error while checking user email",
            },
        });
    }
};

export const handleLoginErrors = (req, res, next) => {
    passport.authenticate("local", (error, user, info) => {
        if (error) {
            return res.status(500).json({
                error: {
                    code: ErrorCodes.INTERNAL_SERVER_ERROR,
                    message: "Authentication error",
                },
            });
        }

        if (!user) {
            return res.status(401).json({
                error: {
                    code: ErrorCodes.INVALID_CREDENTIALS,
                    message: info?.message || "Invalid email or password",
                },
            });
        }

        req.login(user, (error) => {
            if (error) {
                return res.status(500).json({
                    error: {
                        code: ErrorCodes.INTERNAL_SERVER_ERROR,
                        message: "Login session failed",
                    },
                });
            }

            req.user = user;
            next();
        });
    })(req, res, next);
};
