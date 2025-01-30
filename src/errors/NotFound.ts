import BaseError from "./BaseError";

export default class NotFound extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = "NOT_FOUND";
    this.code = 404;
  }
}
