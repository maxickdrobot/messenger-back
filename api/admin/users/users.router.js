import express from "express";
import * as usersController from "./users.controller.js";
import * as usersMiddleware from "./users.middleware.js";

const router = express.Router();

router.get("/registration-requests", usersController.getRegistrationRequests);
router.post(
    "/registration-requests/:email/approve",
    [usersMiddleware.checkUserRegistrationRequestExist],
    usersController.approveRegistrationRequest
);
router.post(
    "/registration-requests/:email/reject",
    [usersMiddleware.checkUserRegistrationRequestExist],
    usersController.rejectRegistrationRequest
);

export default router;
