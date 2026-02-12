import { featureService } from "./feature.service.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { Request, Response } from "express";

export const featureController = {
  async createFeature(req: Request, res: Response) {
    try {
      const result = await featureService.createFeature(req.body);
      return sendSuccess(res, "Feature created successfully", result);
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },

  async createFeatureBulk(req: Request, res: Response) {
    try {
      const { names } = req.body;

      if (!names) {
        return sendError(res, "Names array is required", 400);
      }

      const result = await featureService.createFeatureBulk(names);
      return sendSuccess(
        res,
        `${result.length} feature(s) created successfully`,
        result,
      );
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },

  async getAllFeatures(req: Request, res: Response) {
    try {
      const result = await featureService.getAll();
      return sendSuccess(res, "Features fetched successfully", result);
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },

  async getFeatureById(req: Request, res: Response) {
    try {
      const result = await featureService.getById(Number(req.params.id));
      return sendSuccess(res, "Feature fetched successfully", result);
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },

  async updateFeature(req: Request, res: Response) {
    try {
      const result = await featureService.updateFeature(
        Number(req.params.id),
        req.body,
      );
      return sendSuccess(res, "Feature updated successfully", result);
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },

  async deleteFeature(req: Request, res: Response) {
    try {
      await featureService.deleteFeature(Number(req.params.id));
      return sendSuccess(res, "Feature deleted successfully");
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },
};
