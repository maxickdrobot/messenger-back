import { ErrorCodes } from "../../../constants/errorCodes.js";

export const checkAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            code: ErrorCodes.UNAUTHORIZED,
            error: "Please login or register",
        });
    }
    next();
};

export const checkAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === "admin") {
        return next();
    }

    return res.status(403).json({
        error: {
            code: ErrorCodes.FORBIDDEN,
            message: "You do not have permission to access this resource",
        },
    });
};
