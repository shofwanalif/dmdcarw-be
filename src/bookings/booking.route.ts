import { Router } from "express";
import { bookingController } from "./booking.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/role-based.middleware.js";

const router = Router();

router.post("/create", authenticate, bookingController.createBooking);
router.get(
  "/all",
  authenticate,
  requireAdmin,
  bookingController.getAllBookings,
);
router.get("/my-bookings", authenticate, bookingController.getMyBookings);
router.get(
  "/detail/:bookingCode",
  authenticate,
  requireAdmin,
  bookingController.getBookingDetailByCode,
);
router.put(
  "/update/:id",
  authenticate,
  requireAdmin,
  bookingController.updateBooking,
);

router.delete(
  "/delete/:id",
  authenticate,
  requireAdmin,
  bookingController.deleteBooking,
);

export default router;
