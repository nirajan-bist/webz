import db from "../db";
import { queryBuilder } from "../utils/knex";
import createLogger from "Utils/logger";
import { Knex } from "knex";

const logger = createLogger("webz model");
export const TABLE_NAME = "posts";

/**
 * Optional Post interface, adjust fields as appropriate.
 */
export interface Post {
  threadId: string;
  title: string;
  url: string;
  text: string;
  published: Date;
}

/**
 * Create a Knex query builder instance for the `posts` table.
 */
const qb = queryBuilder(TABLE_NAME);

/**
 * Inserts an array of Post objects into the `posts` table.
 * @param {Post[]} posts - Array of posts to be saved.
 * @param {Knex.Transaction} [trx] - Optional Knex transaction.
 * @returns {Promise<number>} - Number of rows inserted.
 */
export async function savePosts(posts: Post[], trx?: Knex.Transaction): Promise<number> {
  try {
    if (posts.length === 0) {
      // No posts to insert
      return 0;
    }

    // Transform each Post into the shape required by the DB
    const insertData = posts.map((p) => ({
      thread_id: p.threadId,
      title: p.title,
      url: p.url,
      text: p.text,
      published: p.published,
    }));

    await qb({ trx }).insert(insertData);
    logger.info(`Inserted ${posts.length} posts into '${TABLE_NAME}'.`);
    return posts.length;
  } catch (err) {
    logger.error(`Error inserting posts into '${TABLE_NAME}': ${(err as Error).message}`);
    return 0;
  }
}
