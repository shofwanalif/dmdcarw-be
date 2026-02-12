import { Router } from "express";
import { dateSlotsController } from "./dateslots.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/role-based.middleware.js";

const router = Router();

router.post(
  "/generate-single-day",
  authenticate,
  requireAdmin,
  dateSlotsController.generateSingleDaySlots,
);

router.post(
  "/generate-date-range",
  authenticate,
  requireAdmin,
  dateSlotsController.generateDateRangeSlots,
);

router.get("/date/:date", authenticate, dateSlotsController.getDateSlotsByDate);

router.get(
  "/date-range",
  authenticate,
  dateSlotsController.getDateSlotsByDateRange,
);

router.get("/all", authenticate, dateSlotsController.getAllDateSlots);

router.put(
  "/update/:id",
  authenticate,
  requireAdmin,
  dateSlotsController.updateDateSlot,
);

router.delete(
  "/delete/:id",
  authenticate,
  requireAdmin,
  dateSlotsController.deleteDateSlot,
);

export default router;
