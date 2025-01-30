import BaseError from "./BaseError";

export default class TokenError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = "TOKEN_ERROR";
    this.code = 401;
  }
}
