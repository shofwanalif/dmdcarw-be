import { Response } from "express";

/**
 * Interface for success response structure
 */
interface SuccessResponse<T = any> {
  success: true;
  message: string;
  data: T;
}

/**
 * Interface for error response structure
 */
interface ErrorResponse {
  success: false;
  message: string;
}

/**
 * Send a success response with consistent format
 * @param res - Express response object
 * @param message - Success message
 * @param data - Response data (optional)
 * @param statusCode - HTTP status code (default: 200)
 */
export const sendSuccess = <T = any>(
  res: Response,
  message: string,
  data: T = {} as T,
  statusCode: number = 200,
): Response<SuccessResponse<T>> => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Send an error response with consistent format
 * @param res - Express response object
 * @param message - Error message
 * @param statusCode - HTTP status code (default: 400)
 */
export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 400,
): Response<ErrorResponse> => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

/**
 * Send a created response (201)
 * @param res - Express response object
 * @param message - Success message
 * @param data - Response data
 */
export const sendCreated = <T = any>(
  res: Response,
  message: string,
  data: T,
): Response<SuccessResponse<T>> => {
  return sendSuccess(res, message, data, 201);
};

/**
 * Send a no content response (204)
 * @param res - Express response object
 */
export const sendNoContent = (res: Response): Response => {
  return res.status(204).send();
};

/**
 * Send a bad request error (400)
 * @param res - Express response object
 * @param message - Error message
 */
export const sendBadRequest = (
  res: Response,
  message: string,
): Response<ErrorResponse> => {
  return sendError(res, message, 400);
};

/**
 * Send an unauthorized error (401)
 * @param res - Express response object
 * @param message - Error message (default: "Unauthorized")
 */
export const sendUnauthorized = (
  res: Response,
  message: string = "Unauthorized",
): Response<ErrorResponse> => {
  return sendError(res, message, 401);
};

/**
 * Send a forbidden error (403)
 * @param res - Express response object
 * @param message - Error message (default: "Forbidden")
 */
export const sendForbidden = (
  res: Response,
  message: string = "Forbidden",
): Response<ErrorResponse> => {
  return sendError(res, message, 403);
};

/**
 * Send a not found error (404)
 * @param res - Express response object
 * @param message - Error message
 */
export const sendNotFound = (
  res: Response,
  message: string,
): Response<ErrorResponse> => {
  return sendError(res, message, 404);
};

/**
 * Send an internal server error (500)
 * @param res - Express response object
 * @param message - Error message (default: "Internal server error")
 */
export const sendInternalError = (
  res: Response,
  message: string = "Internal server error",
): Response<ErrorResponse> => {
  return sendError(res, message, 500);
};
