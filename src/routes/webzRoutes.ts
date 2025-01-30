import { Router } from "express";
import { fetchAndStoreData } from "src/controllers/webz";

const app = Router();

app.get("/", fetchAndStoreData);

export default app;
