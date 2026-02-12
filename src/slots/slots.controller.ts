import { slotService } from "./slots.service.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { Request, Response } from "express";

export const slotController = {
  async createSlot(req: Request, res: Response) {
    try {
      const result = await slotService.createSlot(req.body);
      return sendSuccess(res, "Time Slot Created Successfully", result);
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },

  async createManySlots(req: Request, res: Response) {
    try {
      const result = await slotService.createManySlots(req.body.times);
      return sendSuccess(res, "Time Slots Created Successfully", result);
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },

  async getAllSlots(req: Request, res: Response) {
    try {
      const result = await slotService.getAllSlots();
      return sendSuccess(res, "Time Slots Fetched Successfully", result);
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },

  async deleteSlot(req: Request, res: Response) {
    try {
      const result = await slotService.deleteSlot(Number(req.params.id));
      return sendSuccess(res, "Time Slot Deleted Successfully", result);
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },
};
