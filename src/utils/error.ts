import ValidationError from "../errors/ValidationError";

export function throwWithDatabase(error: any, message: string) {
  if (!error.code) throw error;

  switch (error.code) {
    case "23505":
      throw new ValidationError(message || "Duplicate data provided");
    default:
      throw error;
  }
}
