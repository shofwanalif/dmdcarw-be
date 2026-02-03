import { authService } from "./auth.service.js";
import { Request, Response } from "express";
import { sendSuccess, sendError } from "../utils/response.js";

export const authController = {
  async signUp(req: Request, res: Response) {
    try {
      const result = await authService.signUp(req.body);
      return sendSuccess(res, "USer created successfully", result);
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },

  //   async signIn(req: Request, res: Response) {
  //     try {
  //       const { email, password } = req.body;
  //       const result = await authService.signIn(email, password);
  //       return sendSuccess(res, "User signed in successfully", result);
  //     } catch (error) {
  //       const errorr = error as Error;
  //       return sendError(res, errorr.message);
  //     }
  //   },

  //   async signOut(req: Request, res: Response) {
  //     try {
  //       await authService.signOut(req.headers);
  //       return sendSuccess(res, "User signed out successfully");
  //     } catch (error) {
  //       const errorr = error as Error;
  //       return sendError(res, errorr.message);
  //     }
  //   },

  async updateRole(req: Request, res: Response) {
    try {
      const result = await authService.updateRole(
        req.params.userId as string,
        req.body.role,
        (req as any).user.id,
      );
      return sendSuccess(res, "Role updated successfully", result);
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },

  //   async getCurrentUser(req: Request, res: Response) {
  //     try {
  //       const result = await authService.getCurrentUser(req.headers);
  //       return sendSuccess(res, "User fetched successfully", result);
  //     } catch (error) {
  //       const errorr = error as Error;
  //       return sendError(res, errorr.message);
  //     }
  //   },

  async getAllUsers(req: Request, res: Response) {
    try {
      const result = await authService.getAllUsers((req as any).user.id);
      return sendSuccess(res, "Users fetched successfully", result);
    } catch (error) {
      const errorr = error as Error;
      return sendError(res, errorr.message);
    }
  },
};
