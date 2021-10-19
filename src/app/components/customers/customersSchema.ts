import Joi from "joi";

export const createCustomerSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone_number: Joi.string(),
  address: Joi.string(),
});

export const getAllCustomersSchema = Joi.object().keys({
  page: Joi.number().min(1).default(1),
  per_page: Joi.number().min(1).default(10),
});

export const getOneCustomerSchema = Joi.object().keys({
  id: Joi.number().min(1).required(),
});
