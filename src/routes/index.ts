import { Router } from "express";

import authenticateRequest from "../middlewares/auth";

import authRoutes from "./authRoutes";
import appRoutes from "./appRoutes";
import userRoutes from "./userRoutes";
import webzRoutes from "./webzRoutes";

const app = Router();

app.use("/auth", authRoutes);
app.use("/app", authenticateRequest, appRoutes);
app.use("/users", authenticateRequest, userRoutes);
app.use("/webz", webzRoutes);

export default app;
