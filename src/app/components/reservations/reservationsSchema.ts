import Joi from "joi";
import { ReservationStatus } from "./reservationsInterface";

export const createReservationSchema = Joi.object().keys({
  customer_id: Joi.number().min(1).required(),
  room_id: Joi.number().min(1).required(),
  status: Joi.string()
    .valid(...Object.values(ReservationStatus))
    .required(),
  expected_checkin_time: Joi.date().required(),
  expected_checkout_time: Joi.date().required(),
  checkin_time: Joi.date(),
});

export const getAllReservationsSchema = Joi.object().keys({
  page: Joi.number().min(1).default(1),
  per_page: Joi.number().min(1).default(10),
});

export const getOneReservationSchema = Joi.object().keys({
  id: Joi.number().min(1).required(),
});

export const checkinReservationSchema = Joi.object().keys({
  id: Joi.number().min(1).required(),
  checkin_time: Joi.date().required(),
});

export const checkoutReservationSchema = Joi.object().keys({
  id: Joi.number().min(1).required(),
  checkout_time: Joi.date().required(),
});
