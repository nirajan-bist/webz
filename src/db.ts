import knex from "knex";
import dbConfig from "./knexfile";

import camelCaseKeys from "camelcase-keys";
import snakeCase from "lodash/snakeCase";

const additionalConfig = {
  wrapIdentifier: (value: any, origImpl: any) => {
    if (value === "*") {
      return origImpl(value);
    }

    return origImpl(snakeCase(value));
  },
  postProcessResponse: (result: any) => {
    if (Array.isArray(result)) {
      if (result.length === 0 || !result[0] || typeof result[0] !== "object") {
        return result;
      } else {
        return camelCaseKeys(result, { deep: true });
      }
    }
  },
};

// Configure knex with db params set in knexfile.
export default knex({ ...dbConfig, ...additionalConfig });
