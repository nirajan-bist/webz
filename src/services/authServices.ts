import jwt from "jsonwebtoken";

import * as Auth from "Models/auth";
import * as Token from "Models/token";
import * as User from "Models/user";

import createLogger from "Utils/logger";
import { getHashedPassword, compareHash, formatTokenResponse, getNewAccessToken } from "Utils/auth";

import { TOKEN_SECRETS, REFRESH_TOKEN } from "Constants/index";
import ValidationError from "../errors/ValidationError";
import TokenError from "../errors/TokenError";
import db from "../db";

import { TokenData } from "Types/user";

const logger = createLogger("auth_service");

/**
 * Sign in an existing user.
 * @param {Object} data email and password
 * @returns {Object} {user, tokens}
 */
export async function signIn(data: any) {
  const { email, password } = data;
  const user = await Auth.fetchByEmail(email);

  if (!user) {
    throw new ValidationError("Invalid Email or Password!");
  }

  const { password: hashedPassword } = user;
  const pass = compareHash(password, hashedPassword);

  if (pass) {
    const tokenResponse = formatTokenResponse(user);
    await Token.insert([
      {
        userId: user.id,
        isAccessToken: true,
        isActive: true,
        token: tokenResponse.tokens.accessToken,
      },
      {
        userId: user.id,
        isAccessToken: false,
        isActive: true,
        token: tokenResponse.tokens.refreshToken,
      },
    ]);

    return tokenResponse;
  }

  throw new ValidationError("Invalid Email or Password!");
}
/**
 * Creates new user user.
 * @param {Object} data email and password
 * @returns {Object} {user, tokens}
 */
export async function signUp(data: any) {
  const role = "Employee";
  const { password, ...dataWithoutPassword } = data;
  const hashedPassword = getHashedPassword(password);

  const userData = { ...dataWithoutPassword, role };

  try {
    return await db.transaction(async (trx) => {
      const user = await User.insertOne(userData, trx);
      await Auth.insertOne({ ...userData, password: hashedPassword }, trx);

      const tokenResponse = formatTokenResponse(user);
      await Token.insert(
        [
          {
            userId: user.id,
            isAccessToken: true,
            isActive: true,
            token: tokenResponse.tokens.accessToken,
          },
          {
            userId: user.id,
            isAccessToken: false,
            isActive: true,
            token: tokenResponse.tokens.refreshToken,
          },
        ],
        trx
      );

      return tokenResponse;
    });
  } catch (e) {
    logger.error(e);
    throw new ValidationError("User with this email exists already!");
  }
}
/**
 * Generates new access token and refresh token from existing refresh token.
 * @param {Object} data Refresh token
 * @returns {Object} {user, tokens}
 */
export async function generateNewAccessToken(data: any) {
  try {
    const { refreshToken } = data;

    const user = jwt.verify(refreshToken, TOKEN_SECRETS[REFRESH_TOKEN]) as TokenData;

    const token = await Token.fetchByUserActiveToken(user.id, refreshToken);
    if (!token) throw "";

    const userData = await Auth.fetchByEmail(user.email);

    const newAccessToken = getNewAccessToken(userData);
    await Token.insert({ userId: user.id, isAccessToken: true, isActive: true, token: newAccessToken });

    return newAccessToken;
  } catch (err) {
    logger.error(err);
    throw new TokenError("Invalid Refresh Token");
  }
}
/**
 * Generates new access token and refresh token from existing refresh token.
 * @param {Object} [data] Refresh token
 * @returns {Object} {user, tokens}
 */
export async function isValidToken(userId: number, token: string): Promise<boolean> {
  try {
    const isValid = (await Token.fetchByUserActiveToken(userId, token)) as boolean;
    if (!isValid) return false;
    return true;
  } catch (err) {
    logger.error(err);
    throw new TokenError("Token Expired!");
  }
}
