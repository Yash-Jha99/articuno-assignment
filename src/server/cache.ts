import { type RedisClientType, createClient } from "redis";

import { env } from "~/env.mjs";

const globalForRedis = globalThis as unknown as {
  redis: RedisClientType | undefined;
};

export const redis =
  globalForRedis.redis ?? createClient({ url: env.REDIS_URL });

if (env.NODE_ENV !== "production") globalForRedis.redis = redis;

const main = async () => {
  if (!redis.isOpen) await redis.connect();
};

main()
  .then(() => console.log("Connected to redis"))
  .catch((err) => console.log("Redis connection error...", err));

redis.on("error", (err) => {
  console.log("Redis Error : ", err);
});
