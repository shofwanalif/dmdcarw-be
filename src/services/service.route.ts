import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/role-based.middleware.js";
import { serviceController } from "./service.controller.js";

const router = Router();

router.post(
  "/create-service",
  authenticate,
  requireAdmin,
  serviceController.createService,
);
router.get("/get-all-services", serviceController.getAllServices);

router.put(
  "/update-service/:id",
  authenticate,
  requireAdmin,
  serviceController.updateService,
);

router.get("/get-detail-service/:id", serviceController.getDetailService);

router.delete(
  "/delete-service/:id",
  authenticate,
  requireAdmin,
  serviceController.deleteService,
);

export default router;
