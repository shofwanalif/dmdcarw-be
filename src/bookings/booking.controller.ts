import { bookingService } from "./booking.service.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { Request, Response } from "express";

export const bookingController = {
  async createBooking(req: Request, res: Response) {
    try {
      // User ID from authenticated session (added by middleware)
      const userId = (req as any).user.id;
      const { dateSlotId, customerName, phone, vehicleNumber, paymentMethod } =
        req.body;

      if (
        !dateSlotId ||
        !customerName ||
        !phone ||
        !vehicleNumber ||
        !paymentMethod
      ) {
        return sendError(res, "Missing required fields", 400);
      }

      const booking = await bookingService.createBooking({
        userId,
        dateSlotId: Number(dateSlotId),
        customerName,
        phone,
        vehicleNumber,
        paymentMethod,
      });

      return sendSuccess(res, "Booking created successfully", booking);
    } catch (error) {
      const err = error as Error;
      if (err.message === "Slot is full") {
        return sendError(res, err.message, 400); // Bad Request for full slot
      }
      return sendError(res, err.message);
    }
  },

  async getAllBookings(req: Request, res: Response) {
    try {
      const bookings = await bookingService.getAllBookings();
      return sendSuccess(res, "All bookings fetched successfully", bookings);
    } catch (error) {
      const err = error as Error;
      return sendError(res, err.message);
    }
  },

  async getMyBookings(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const bookings = await bookingService.getBookingsByUser(userId);
      return sendSuccess(res, "My bookings fetched successfully", bookings);
    } catch (error) {
      const err = error as Error;
      return sendError(res, err.message);
    }
  },

  async getBookingDetailByCode(req: Request, res: Response) {
    try {
      const bookingCode = req.params.bookingCode as string;
      const booking = await bookingService.getBookingByCode(bookingCode);
      return sendSuccess(res, "Booking detail fetched successfully", booking);
    } catch (error) {
      const err = error as Error;
      return sendError(res, err.message);
    }
  },

  async updateBooking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const booking = await bookingService.updateBooking(Number(id), req.body);
      return sendSuccess(res, "Booking updated successfully", booking);
    } catch (error) {
      const err = error as Error;
      return sendError(res, err.message);
    }
  },

  async deleteBooking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const booking = await bookingService.deleteBooking(Number(id));
      return sendSuccess(res, "Booking deleted successfully", booking);
    } catch (error) {
      const err = error as Error;
      return sendError(res, err.message);
    }
  },
};
