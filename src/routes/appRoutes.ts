import { Router } from "express";

import { getSettings, updateSetting } from "src/controllers/app";
import { validateUpdateSettings } from "src/validators/appValidators";

const app = Router();

app.get("/settings", getSettings);
app.patch("/settings", validateUpdateSettings, updateSetting);

export default app;
