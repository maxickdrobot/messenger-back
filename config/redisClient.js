import { createClient } from "redis";

const redisClient = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

redisClient
  .connect()
  .then(() => console.log("Redis connected successfully"))
  .catch((err) => console.error("Failed to connect to Redis:", err));

export default redisClient;
