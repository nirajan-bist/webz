import { Request } from "express";

export type AuthenticatedRequest = Request & {
  user: Record<string, any>;
};
