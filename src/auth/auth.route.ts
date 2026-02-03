import { Router } from "express";
import { authController } from "./auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/role-based.middleware.js";

const router = Router();

router.post("/signup", authController.signUp);
// protected routes
// router.get("/me", authenticate, authController.getCurrentUser); // Use /api/auth/get-session instead
// router.post("/signout", authenticate, authController.signOut); // Use /api/auth/sign-out instead

// public routes
// router.post("/signin", authController.signIn); // Use /api/auth/sign-in/email instead

// admin routes
router.patch(
  "/admin/role/:userId",
  authenticate,
  requireAdmin,
  authController.updateRole,
);
router.get(
  "/admin/users",
  authenticate,
  requireAdmin,
  authController.getAllUsers,
);

export default router;
