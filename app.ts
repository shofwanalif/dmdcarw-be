import express from "express";
import cors from "cors";
import morgan from "morgan";

import { env } from "./src/config/env.js";
import routes from "./src/routes/index.js";
import { notFound } from "./src/middlewares/notfound.middleware.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());

if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api", routes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
