import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  TOKEN_SECRETS,
  TOKEN_TYPES,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} from "../constants";
import TokenError from "../errors/TokenError";
import { omit } from "lodash";

import { User, TokenData, UserWithPassword } from "Types/user";
/**
 * Returns salted hash from given plain-text password.
 * @param {String} rawPassword
 */
export function getHashedPassword(rawPassword: string) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(rawPassword, salt);

  return hash;
}
/**
 * Returns true if hashes match otherwise false.
 * @param {String} hashA
 * @param {String} hashB
 */
export function compareHash(hashA: string, hashB: string) {
  return bcrypt.compareSync(hashA, hashB);
}
/**
 * Generates access token and refresh token from given data.
 * @param {Object} data Claims for the token.
 */
export function getSignedTokens(data: any) {
  return {
    accessToken: jwt.sign(data, TOKEN_SECRETS[ACCESS_TOKEN], { expiresIn: ACCESS_TOKEN_EXPIRY }),
    refreshToken: jwt.sign(data, TOKEN_SECRETS[REFRESH_TOKEN], { expiresIn: REFRESH_TOKEN_EXPIRY }),
  };
}
/**
 * Formats the token payload
 * @param {Object} data Claims for the token.
 */
export function formatTokenData(data: UserWithPassword & { permissions?: string[] }) {
  // Extract only the claims from the data
  const { permissions = [], ...rest } = omit(data, ["password"]);

  const mappedPermissions = permissions.reduce((acc: Record<string, any>, permission: string) => {
    if (permission == null) return acc;
    return { ...acc, [permission]: permission };
  }, {});

  return { ...rest, permissions: mappedPermissions } as unknown as TokenData;
}
/**
 * Formats the token response
 * @param {Object} data Claims for the token.
 */
export function formatTokenResponse(data: UserWithPassword) {
  const user = formatTokenData(data);
  return {
    user,
    tokens: getSignedTokens(user),
  };
}

/**
 * Generates new access token from given data.
 * @param {Object} data Claims for the token.
 */
export function getNewAccessToken(data: UserWithPassword): string {
  const user = formatTokenData(data);
  return jwt.sign(user, TOKEN_SECRETS[ACCESS_TOKEN], { expiresIn: ACCESS_TOKEN_EXPIRY });
}

/**
 * Gets payload/claims from the given token.
 * @param {String} token
 * @param {String} tokenType
 * @returns
 */
export function getPayloadFromToken(token: string, tokenType = TOKEN_TYPES.ACCESS_TOKEN) {
  try {
    const decoded = jwt.verify(token, TOKEN_SECRETS[tokenType]) as TokenData;

    return decoded;
  } catch (err) {
    throw new TokenError("Invalid Token");
  }
}
