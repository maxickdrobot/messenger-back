import express from "express";
import passport from "passport";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import sessionConfig from "./config/session.js";
import configurePassport from "./config/passport.js";
import indexRouter from "./api/index.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan("dev"));

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

connectDB();

configurePassport(passport);

app.use(sessionConfig);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", express.json(), indexRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
