import db from "../db";
import { queryBuilder } from "../utils/knex";

import { Knex } from "knex";
import { UserWithPassword } from "Types/user";

export const TABLE_NAME = "auth";
export const DEFAULT_USER_FIELDS = ["user_id as id", "email", "password"];

const qb = queryBuilder(TABLE_NAME);

/**
 * Fetch a user by email.
 * @param {String} email
 * @returns {Object} object
 */
export async function fetchByEmail(email: string, trx?: Knex.Transaction): Promise<UserWithPassword> {
  const [result] = await qb({ trx, isRaw: true }).select(
    db.raw(
      `* FROM "auth" AS "au" INNER JOIN "users" AS "u" ON "u"."id" = "au"."id" 
      INNER JOIN (SELECT pf.id, json_agg(DISTINCT permissions) permissions FROM (
      SELECT "u".id, rp.permission_name AS permissions FROM "users" as "u" LEFT JOIN "role_permissions" AS "rp" ON "rp"."role" = "u"."role" WHERE "u"."email" = :email
        UNION
      SELECT "u".id, up.name AS permissions FROM "users" as "u" LEFT JOIN "user_permissions" AS "up" ON "up"."user_id" = "u"."id" WHERE "u"."email" = :email) 
      AS pf GROUP BY pf.id) AS "subquery" ON "u"."id" = "subquery"."id"`,
      { email }
    )
  );
  return result;
}

/**
 * Inserts a new user.
 * @param {Object} data
 * @returns {Object} object
 */
export async function insertOne(data: any, trx?: Knex.Transaction) {
  const [result] = await qb({ trx }).insert(data);
  return result;
}

/**
 * Inserts multiple users.
 * @param {Object} data
 * @returns {Object} object
 */
export async function insertMany(data: any, trx?: Knex.Transaction) {
  const result = await qb({ trx }).insert(data);
  return result;
}
