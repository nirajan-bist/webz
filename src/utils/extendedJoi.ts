import Joi from "joi";
import joiDate from "@joi/date";

export default Joi.extend(joiDate) as Joi.Root;
