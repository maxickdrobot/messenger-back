import express from "express";
import * as usersController from "./users.controller.js";
import * as usersMiddleware from "./users.middleware.js";
import * as authMiddleware from "../../common/middleware/auth.maiddleware.js";

const router = express.Router();

// router.post(
//     "/register",
//     [
//         usersMiddleware.validateRegisterUser,
//         usersMiddleware.checkUserExist,
//     ],
//     usersController.register
// );
router.post(
    "/registration-request",
    [
        usersMiddleware.validateRegistrationRequestUser,
        usersMiddleware.checkUserRegistrationRequestExist,
        usersMiddleware.checkUserExist,
    ],
    usersController.registrationRequest
);
router.post(
    "/login",
    [usersMiddleware.validateLoginUser, usersMiddleware.handleLoginErrors],
    usersController.login
);
router.get("/logout", [authMiddleware.checkAuth], usersController.logout);

export default router;
