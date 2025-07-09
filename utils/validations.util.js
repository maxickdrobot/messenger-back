const Joi = require("joi");
const USER_ROLES = require("../constants/userRoles");

const createUserSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string()
        .valid(...Object.values(USER_ROLES))
        .default(USER_ROLES.USER),
});

const createUserValidation = (data) => {
    return createUserSchema.validateAsync(data);
};

module.exports = {
    createUserValidation,
};
