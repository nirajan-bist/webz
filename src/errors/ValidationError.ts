import BaseError from "./BaseError";

export default class ValidationError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = "VALIDATION_ERROR";
    this.code = 400;
  }
}
