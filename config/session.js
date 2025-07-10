import session from "express-session";
import { RedisStore } from "connect-redis";
import redisClient from "./redisClient.js";

const secret = process.env.SECRET || "SOMESECRETKEY";
if (!process.env.SECRET) {
    console.warn("⚠️ Using fallback session secret. Set process.env.SECRET for security.");
}

const sessionConfig = session({
    name: "sid",
    store: new RedisStore({ client: redisClient }),
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    },
});

export default sessionConfig;
