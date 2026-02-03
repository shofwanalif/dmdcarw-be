import express from "express";
import cors from "cors";
import morgan from "morgan";
import { toNodeHandler } from "better-auth/node";
import authRoutes from "./src/auth/auth.route.js";

import { env } from "./src/config/env.js";
import routes from "./src/routes/index.js";
import { notFound } from "./src/middlewares/notfound.middleware.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";
import { auth } from "./src/auth/auth.js";

const app = express();

// Global Middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());

if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Custom Auth Routes (must be before Better Auth catch-all)
app.use("/api/auth", authRoutes);

// Better Auth Routes
app.all("/api/auth/*splat", toNodeHandler(auth));

// Routes
app.use("/api", routes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
