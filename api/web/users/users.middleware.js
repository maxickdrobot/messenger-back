const usersService = require("./users.service");
const validationUtil = require("../../../utils/validations.util");

const validateUser = (req, res, next) => {
    return validationUtil
        .createUserValidation(req.body)
        .then((data) => {
            req.body = data;
            next();
        })
        .catch((error) => {
            return res.status(400).json({
                message: "Validation Error",
                details: error.details,
            });
        });
};

const checkUserExist = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await usersService.getUserByEmail(email);

        if (user) {
            return res.status(400).json({
                message: "An account with this email already exists. Try another email or login.",
            });
        }

        next();
    } catch (err) {
        return res.status(500).json({
            message: "Server error while checking user email",
            error: err.message,
        });
    }
};

module.exports = {
    validateUser,
    checkUserExist,
};
