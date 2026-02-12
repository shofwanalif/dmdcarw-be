import { Router } from "express";
import { featureController } from "./feature.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/role-based.middleware.js";

const router = Router();

router.post(
  "/create-feature",
  authenticate,
  requireAdmin,
  featureController.createFeature,
);
router.post(
  "/create-features-bulk",
  authenticate,
  requireAdmin,
  featureController.createFeatureBulk,
);
router.get(
  "/get-all-features",
  authenticate,
  requireAdmin,
  featureController.getAllFeatures,
);
router.get(
  "/get-feature/:id",
  authenticate,
  requireAdmin,
  featureController.getFeatureById,
);
router.put(
  "/update-feature/:id",
  authenticate,
  requireAdmin,
  featureController.updateFeature,
);
router.delete(
  "/delete-feature/:id",
  authenticate,
  requireAdmin,
  featureController.deleteFeature,
);

export default router;
