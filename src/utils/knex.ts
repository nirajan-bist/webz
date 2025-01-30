import { Knex } from "knex";
import db from "../db";

export function queryBuilder(tablename: string) {
  return ({ alias, trx, isRaw = false }: Record<string, any> = {}) => {
    const knex: any = isRaw ? db : alias ? db(`${tablename} as ${alias}`) : db(`${tablename}`);
    if (trx) {
      return knex.transacting(trx) as Knex;
    }

    return knex as Knex;
  };
}
