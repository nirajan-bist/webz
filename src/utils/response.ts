import { ErrorResponse, SuccessResponse } from "../types/response";

export function getSuccessResponse<T>(data: T, additionalData: Record<string, any> = {}): SuccessResponse<T> {
  return {
    success: true,
    data,
    ...additionalData,
  };
}

export function getErrorResponse(error: any, additionalData: Record<string, any> = {}): ErrorResponse {
  return {
    success: false,
    error,
    ...additionalData,
  };
}
