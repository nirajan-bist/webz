import { Router } from "express";
import { authenticate, createNewUser, logOut, refreshTokens } from "../controllers/auth";
import { validateSignIn, validateSignUp, validateRefreshToken } from "../validators/authValidators";

const app = Router();

app.post("/login", validateSignIn, authenticate);

app.post("/signup", validateSignUp, createNewUser);

app.post("/refresh", validateRefreshToken, refreshTokens);

app.post("/logout", validateRefreshToken, logOut);

export default app;
