import { Router } from "express";
import { categoryController } from "./category.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/role-based.middleware.js";

const router = Router();

router.post(
  "/create-category",
  authenticate,
  requireAdmin,
  categoryController.createCategory,
);
router.get(
  "/get-all-categories",
  authenticate,
  requireAdmin,
  categoryController.getAllCategories,
);
router.get(
  "/get-category/:id",
  authenticate,
  requireAdmin,
  categoryController.getById,
);
router.put(
  "/update-category/:id",
  authenticate,
  requireAdmin,
  categoryController.updateCategory,
);
router.delete(
  "/delete-category/:id",
  authenticate,
  requireAdmin,
  categoryController.deleteCategory,
);

export default router;
