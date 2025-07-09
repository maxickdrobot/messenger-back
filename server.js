const express = require("express");
const connectDB = require("./config/db");
const indexRouter = require("./api/index");

const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

app.use(express.json());

app.use("/", express.json(), indexRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
