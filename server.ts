import app from "./app.js";
import cors from "cors";
import { env } from "./src/config/env.js";
import { logger } from "./src/utils/logger.js";

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.listen(env.PORT, () => {
  const date = new Date();
  logger.info(
    `[${date.toLocaleString()}] Server running on http://localhost:${env.PORT} [${env.NODE_ENV}]`,
  );
});
