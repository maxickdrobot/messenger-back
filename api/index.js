import express from "express";
import webRouter from "./web/index.js";
import adminRouter from "./admin/index.js";
import { swaggerUI, swaggerApiDoc } from "../config/swagger/swagger.js";
import * as authMiddleware from "./common/middleware/auth.maiddleware.js";

const router = express.Router();

router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerApiDoc));
router.use("/admin", [authMiddleware.checkAuth, authMiddleware.checkAdmin], adminRouter);
router.use("/web", webRouter);

export default router;
