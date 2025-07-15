import Joi from "joi";
import { ErrorCodes } from "../constants/errorCodes.js";
import { USER_ROLES } from "../constants/userRoles.js";
import { REGISTRATION_REQUEST_STATUS } from "../constants/RegistrationRequest.js";

const createRegisterUserSchema = Joi.object({
    username: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string()
        .valid(...Object.values(USER_ROLES))
        .default(USER_ROLES.USER),
});

export const createRegisterUserValidation = (data) => {
    return createRegisterUserSchema.validateAsync(data);
};

const createLoginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const createLoginUserValidation = (data) => {
    return createLoginUserSchema.validateAsync(data);
};

const createRegistrationRequestUserSchema = Joi.object({
    username: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    message: Joi.string(),
    status: Joi.string()
        .valid(...Object.values(REGISTRATION_REQUEST_STATUS))
        .default(REGISTRATION_REQUEST_STATUS.PENDING),
});

export const createRegistrationRequestUserValidation = (data) => {
    return createRegistrationRequestUserSchema.validateAsync(data);
};

export const createValidationMiddleware = (validateFn) => {
    return (req, res, next) => {
        validateFn(req.body)
            .then((data) => {
                req.body = data;
                next();
            })
            .catch((error) => {
                res.status(400).json({
                    error: {
                        code: ErrorCodes.VALIDATION_ERROR,
                        message: "Validation failed",
                        details: error.details,
                    },
                });
            });
    };
};
