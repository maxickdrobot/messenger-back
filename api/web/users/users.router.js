const express = require("express");

const usersController = require("./users.controller");
const usersMiddleware = require("./users.middleware");

const router = express.Router();

router.post(
    "/register",
    [usersMiddleware.validateUser, usersMiddleware.checkUserExist],
    usersController.register
);

module.exports = router;
