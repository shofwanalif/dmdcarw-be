import { dateSlotsService } from "./dateslots.service.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { Request, Response } from "express";

export const dateSlotsController = {
  async generateSingleDaySlots(req: Request, res: Response) {
    try {
      const { date, serviceIds } = req.body;

      if (!date) {
        return sendError(res, "Date is required", 400);
      }

      if (!serviceIds || !Array.isArray(serviceIds)) {
        return sendError(res, "Service IDs must be an array", 400);
      }

      const result = await dateSlotsService.generateSingleDay(date, serviceIds);

      return sendSuccess(
        res,
        `Generated ${result.count} date slot(s) for ${date}`,
        result,
      );
    } catch (error) {
      const err = error as Error;
      return sendError(res, err.message);
    }
  },

  async generateDateRangeSlots(req: Request, res: Response) {
    try {
      const { startDate, endDate, serviceIds } = req.body;

      if (!startDate || !endDate) {
        return sendError(res, "Start date and end date are required", 400);
      }

      if (!serviceIds || !Array.isArray(serviceIds)) {
        return sendError(res, "Service IDs must be an array", 400);
      }

      const result = await dateSlotsService.generateDateRange(
        startDate,
        endDate,
        serviceIds,
      );

      return sendSuccess(
        res,
        `Generated ${result.totalCreated} date slot(s) across ${result.daysCount} day(s)`,
        result,
      );
    } catch (error) {
      const err = error as Error;
      return sendError(res, err.message);
    }
  },

  async getDateSlotsByDate(req: Request, res: Response) {
    try {
      const date = req.params.date as string;

      const dateSlots = await dateSlotsService.getDateSlotsByDate(date);

      return sendSuccess(
        res,
        `Found ${dateSlots.length} date slot(s) for ${date}`,
        dateSlots,
      );
    } catch (error) {
      const err = error as Error;
      return sendError(res, err.message);
    }
  },

  async getAllDateSlots(req: Request, res: Response) {
    try {
      const dateSlots = await dateSlotsService.getAllDateSlots();

      return sendSuccess(
        res,
        `Found ${dateSlots.length} date slot(s)`,
        dateSlots,
      );
    } catch (error) {
      const err = error as Error;
      return sendError(res, err.message);
    }
  },

  async getDateSlotsByDateRange(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return sendError(res, "Start date and end date are required", 400);
      }

      // Ensure query params are strings
      const startDateStr =
        typeof startDate === "string" ? startDate : String(startDate);
      const endDateStr =
        typeof endDate === "string" ? endDate : String(endDate);

      const dateSlots = await dateSlotsService.getDateSlotsByDateRange(
        startDateStr,
        endDateStr,
      );

      return sendSuccess(
        res,
        `Found ${dateSlots.length} date slot(s) from ${startDateStr} to ${endDateStr}`,
        dateSlots,
      );
    } catch (error) {
      const err = error as Error;
      return sendError(res, err.message);
    }
  },

  async updateDateSlot(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const dateSlot = await dateSlotsService.updateDateSlot(id, req.body);

      return sendSuccess(res, "Date slot updated successfully", dateSlot);
    } catch (error) {
      const err = error as Error;
      return sendError(res, err.message);
    }
  },

  async deleteDateSlot(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const dateSlot = await dateSlotsService.deleteDateSlot(id);

      return sendSuccess(res, "Date slot deleted successfully", dateSlot);
    } catch (error) {
      const err = error as Error;
      return sendError(res, err.message);
    }
  },
};
