import { Knex } from "knex";
import { queryBuilder } from "../utils/knex";
import { User, UserWithoutId } from "Types/user";
import { CreateUsersPayload } from "Types/requestPayload";

export const TABLE_NAME = "users";

const qb = queryBuilder(TABLE_NAME);

const BASIC_USER_FIELDS = ["id", "username", "email"];

/**
 * Fetch by user id.
 * @param {Number} id
 * @returns {Object} object[]
 */
export async function fetchById(id: number, trx?: Knex.Transaction) {
  const [result] = await qb({ trx }).select("*").where(`${TABLE_NAME}.id`, id);
  return result;
}
/**
 * Fetch by username.
 * @param {String} username
 * @returns {Object} object
 */
export async function fetchByUsername(username: string, trx?: Knex.Transaction) {
  const [result] = await qb({ trx }).select("*").where(`${TABLE_NAME}.username`, username);
  return result;
}

/**
 * Fetch all users.
 * @returns {Object} object[]
 */
export async function fetchAll(trx?: Knex.Transaction) {
  const result = await qb({ trx }).select("*");
  return result;
}

/**
 * Inserts a new user.
 * @param {Object} data
 * @returns {Object} object
 */
export async function insertOne(data: UserWithoutId, trx?: Knex.Transaction) {
  const [result] = await qb({ trx }).insert(data, BASIC_USER_FIELDS);
  return result;
}

/**
 * Inserts multiple users.
 * @param {Object} data
 * @returns {Object} object
 */
export async function insertMany(data: Omit<CreateUsersPayload, "password">[], trx?: Knex.Transaction) {
  const result = await qb({ trx }).insert(data, BASIC_USER_FIELDS);
  return result;
}

/**
 * Update by userId.
 * @param {User} data
 * @returns {Object} object
 */
export async function updateById(data: Partial<User>, trx?: Knex.Transaction) {
  const result = await qb({ trx }).where(`${TABLE_NAME}.id`, data.id).update(data, BASIC_USER_FIELDS);
  return result;
}

/**
 * Delete multiple users.
 * @param {Number[]} ids
 */
export async function deleteMany(ids: number[], trx?: Knex.Transaction) {
  const result = await qb({ trx }).delete("*").whereIn("id", ids);
  return result;
}
