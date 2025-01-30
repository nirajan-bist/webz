import { groupBy, omit, capitalize } from "lodash";
import * as Auth from "../models/auth";
import * as User from "../models/user";
import * as Token from "../models/token";

import createLogger from "../utils/logger";
import { getHashedPassword, formatTokenResponse } from "../utils/auth";

import db from "../db";
import NotFound from "src/errors/NotFound";

import { throwWithDatabase } from "../utils/error";
import { CreateUsersPayload, UpdateUserPayload } from "Types/requestPayload";
const logger = createLogger("user_service");

/**
 * Creates new users.
 * @param {Object} usersData list of email and password
 * @returns {Object} {user, tokens}
 */
export async function createUsers(usersData: CreateUsersPayload[]) {
  const usersDataFilteredColumns = usersData.map((user) => omit(user, ["password"]));

  try {
    const newUsers = await db.transaction(async (trx) => {
      logger.info("--Inserting new users");
      const users = await User.insertMany(usersDataFilteredColumns, trx);
      const usersAuthWithHashedPasswords = usersData.map((user, index) => {
        return {
          id: users[index].id,
          password: getHashedPassword(user.password),
        };
      });

      logger.info("--Inserting hashed passwords for new users");
      await Auth.insertMany(usersAuthWithHashedPasswords, trx);
      const usersWithFormattedToken = users.map((user: any) => {
        const tokenResponse = formatTokenResponse(user);
        return [
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
        ];
      });

      const flatUserTokens = usersWithFormattedToken.flat();
      logger.info("--Inserting auth tokens for new users");
      await Token.insert(flatUserTokens, trx);

      return users;
    });

    return newUsers;
  } catch (e) {
    logger.error(e);
    throwWithDatabase(e, "Some user email(s) already exist or duplicated!");
  }
}

/**
 * Get all users.
 */
export async function getUsers() {
  return User.fetchAll();
}

/**
 * Update a user.
 * @param {UpdateUserPayload} data
 */
export async function updateUser(data: UpdateUserPayload) {
  const direct = await User.fetchById(data.id);
  const { managerUsername, ...userData } = data;

  if (!direct) {
    throw new NotFound("User not found");
  }

  return User.updateById(userData);
}

/**
 * Delete users.
 * @param {Number[]} ids List of user ids to be deleted
 */
export async function deleteUsers(ids: number[]) {
  return User.deleteMany(ids);
}
