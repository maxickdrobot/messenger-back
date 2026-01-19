import express from "express";
import * as usersController from "./users.controller.js";
import * as usersMiddleware from "./users.middleware.js";
import * as authMiddleware from "../../common/middleware/auth.maiddleware.js";

const router = express.Router();

router.get("/verify-email/:token", [usersMiddleware.checkTokenExist], usersController.verifyEmail);
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
router.post("/logout", [authMiddleware.checkAuth], usersController.logout);
router.get("/me", [authMiddleware.checkAuth], usersController.getCurrentUser);

export default router;
