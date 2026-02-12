import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/role-based.middleware.js";
import { Router } from "express";
import { slotController } from "./slots.controller.js";

const router = Router();

router.post(
  "/create-slot",
  authenticate,
  requireAdmin,
  slotController.createSlot,
);

router.post(
  "/create-many-slots",
  authenticate,
  requireAdmin,
  slotController.createManySlots,
);

router.get(
  "/get-all-slots",
  authenticate,
  requireAdmin,
  slotController.getAllSlots,
);

router.delete(
  "/delete-slot/:id",
  authenticate,
  requireAdmin,
  slotController.deleteSlot,
);

// router.get(
//   "/get-slot/:id",
//   authenticate,
//   requireAdmin,
//   slotController.getSlotById,
// );

// router.put(
//   "/update-slot/:id",
//   authenticate,
//   requireAdmin,
//   slotController.updateSlot,
// );

export default router;
