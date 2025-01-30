import { ErrorWithCode } from "./error";

export type SuccessResponse<T> = {
  success: true;
  data: T;
  [key: string]: any;
};

export type ErrorResponse = {
  success: false;
  error: ErrorWithCode;
  [key: string]: any;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
