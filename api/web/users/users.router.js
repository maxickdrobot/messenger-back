import express from "express";
import passport from "passport";
import * as usersController from "./users.controller.js";
import * as usersMiddleware from "./users.middleware.js";

const router = express.Router();

router.post(
    "/register",
    [usersMiddleware.validateRegisterUser, usersMiddleware.checkUserExist],
    usersController.register
);
router.post(
    "/login",
    [usersMiddleware.validateLoginUser, usersMiddleware.handleLoginErrors],
    usersController.login
);
router.get("/logout", usersController.logout);

export default router;
