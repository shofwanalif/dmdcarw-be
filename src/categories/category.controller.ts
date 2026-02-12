import { categoryService } from "./category.service.js";
import { Request, Response } from "express";
import { sendSuccess, sendError } from "../utils/response.js";

export const categoryController = {
  async createCategory(req: Request, res: Response) {
    try {
      const result = await categoryService.createCategory(req.body);
      return sendSuccess(res, "Category created successfully", result);
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const result = await categoryService.getById(Number(req.params.id));
      return sendSuccess(res, "Category fetched successfully", result);
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },

  async updateCategory(req: Request, res: Response) {
    try {
      const result = await categoryService.updateCategory(
        Number(req.params.id),
        req.body,
      );
      return sendSuccess(res, "Category updated successfully", result);
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },

  async deleteCategory(req: Request, res: Response) {
    try {
      const result = await categoryService.deleteCategory(
        Number(req.params.id),
      );
      return sendSuccess(res, "Category deleted successfully", result);
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },

  async getAllCategories(req: Request, res: Response) {
    try {
      const result = await categoryService.getAll();
      return sendSuccess(res, "Categories fetched successfully", result);
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },
};
