import Joi from "joi";

/**
 * Validate data with joi schema.
 * @param {Object}  data
 * @param {Object}  schema
 * @returns {Promise}
 */
export default async function validate(data: any, schema: Joi.Schema) {
  const value = await schema.validateAsync(data, { abortEarly: false });

  return value;
}
