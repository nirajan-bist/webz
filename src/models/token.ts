import { Knex } from "knex";
import { queryBuilder } from "../utils/knex";

const TABLE_NAME = "user_tokens";

const qb = queryBuilder(TABLE_NAME);

/**
 * Fetch a user by id.
 * @param {Number} id
 * @returns {Object} object[]
 */
export async function fetchByUserActiveToken(userId: number, token: any) {
  const [result] = await qb().select("*").whereRaw("user_id = ? and token =? and is_active = true", [userId, token]);
  return result;
}
/**
 * Fetch a user by email.
 * @param {String} email
 * @returns {Object} object
 */
export async function invalidateToken(userId: number, trx?: Knex.Transaction) {
  const result = await qb({ trx }).update({ isActive: false }).where("user_id", userId);
  return result;
}
/**
 * Inserts a new user.
 * @param {Object} data
 * @returns {Object} object
 */
export async function insert(data: any, trx?: Knex.Transaction) {
  const result = await qb({ trx }).insert(data);
  return result;
}
