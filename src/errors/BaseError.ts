import { getErrorResponse } from "../utils/response";

export default class BaseError extends Error {
  code: number;
  isCustom: boolean;
  constructor(message: string) {
    super(message);
    this.isCustom = true;
  }

  toResponseObject() {
    return getErrorResponse({
      code: this.code,
      message: this.message,
    });
  }
}
