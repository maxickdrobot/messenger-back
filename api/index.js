const express = require("express");
const webRouter = require("./web/index");
const { swaggerUI, swaggerApiDoc } = require("../config/swagger/swagger");

const router = express.Router();

router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerApiDoc));
router.use("/web", webRouter);

module.exports = router;
