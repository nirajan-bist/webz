import { Router } from "express";
import checkPermissions from "../middlewares/permission";
import { createUsers, getUsers, updateUser, deleteUsers } from "../controllers/user";
import { validateCreateUsers, validateDeleteUsers, validateUpdateUser } from "../validators/userValidators";

import { PERMISSIONS } from "../constants";

const app = Router();

app.get("/", checkPermissions(PERMISSIONS.READ_USERS), getUsers);
app.post("/", checkPermissions(PERMISSIONS.CREATE_USERS), validateCreateUsers, createUsers);
app.patch("/", checkPermissions(PERMISSIONS.UPDATE_USER), validateUpdateUser, updateUser);
app.delete("/", checkPermissions(PERMISSIONS.DELETE_USERS), validateDeleteUsers, deleteUsers);

export default app;
