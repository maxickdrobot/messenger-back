import express from "express";
import webRouter from "./web/index.js";
import { swaggerUI, swaggerApiDoc } from "../config/swagger/swagger.js";

const router = express.Router();

router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerApiDoc));
router.use("/web", webRouter);

export default router;
