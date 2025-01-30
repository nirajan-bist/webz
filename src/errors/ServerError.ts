import { getErrorResponse } from "../utils/response";
import BaseError from "./BaseError";

export default class ServerError extends BaseError {
  constructor(message: string, stack: string) {
    super(message);
    this.name = "SERVER_ERROR";
    this.code = 500;
    this.stack = stack;
  }

  toResponseObject() {
    return getErrorResponse({
      code: this.code,
      message: this.message,
      stack: this.stack,
    });
  }
}
