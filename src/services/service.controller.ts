import { serviceService } from "./service.service.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { Request, Response } from "express";

export const serviceController = {
  async createService(req: Request, res: Response) {
    try {
      const result = await serviceService.createService(req.body);
      return sendSuccess(res, "Service Created Successfully", result);
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },

  async getAllServices(req: Request, res: Response) {
    try {
      const result = await serviceService.getAllServices();
      return sendSuccess(res, "Services Fetched Successfully", result);
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },

  async getDetailService(req: Request, res: Response) {
    try {
      const result = await serviceService.getDetailService(
        Number(req.params.id),
      );
      return sendSuccess(res, "Service Fetched Successfully", result);
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },

  async updateService(req: Request, res: Response) {
    try {
      const result = await serviceService.updateService(
        Number(req.params.id),
        req.body,
      );
      return sendSuccess(res, "Service Updated Successfully", result);
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },

  async deleteService(req: Request, res: Response) {
    try {
      const result = await serviceService.deleteService(Number(req.params.id));
      return sendSuccess(res, "Service Deleted Successfully", result);
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },
};
