import Joi from "joi";

export const createRoomSchema = Joi.object().keys({
  room_type: Joi.string().required(),
  hourly_rate: Joi.number().min(1).required(),
  overstay_weekday_rate: Joi.number().min(1).max(100).required(),
  overstay_weekend_rate: Joi.number().min(1).max(100).required(),
});

export const getAllRoomsSchema = Joi.object().keys({
  page: Joi.number().min(1).default(1),
  per_page: Joi.number().min(1).default(10),
});

export const getOneRoomSchema = Joi.object().keys({
  id: Joi.number().min(1).required(),
});
