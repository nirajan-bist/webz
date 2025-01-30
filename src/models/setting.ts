import db from "../db";
import { queryBuilder } from "../utils/knex";

import { Knex } from "knex";

export const TABLE_NAME = "settings";

const qb = queryBuilder(TABLE_NAME);

/**
 * Fetch all settings.
 * @returns {Object} object
 */
export async function fetchAll(trx?: Knex.Transaction) {
  const result = await qb({ trx }).select("*");
  return result;
}

/**
 * Update setting by name
 * @param {String} updatePayload
 * @returns {Object} object
 */
export async function updateByName(updatePayload: any, trx?: Knex.Transaction) {
  const { key, value } = updatePayload;
  const [result] = await qb({ trx })
    .update({ value: JSON.stringify(value) })
    .where("name", key)
    .returning("*");

  return result;
}
