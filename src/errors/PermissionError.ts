import BaseError from "./BaseError";

export default class PermissionError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = "PERMISSION_ERROR";
    this.code = 403;
  }
}
