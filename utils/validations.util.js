import Joi from "joi";
import USER_ROLES from "../constants/userRoles.js";

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
