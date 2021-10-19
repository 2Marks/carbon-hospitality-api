import { validate } from "../../helpers";
import {
  CheckinReservationDTO,
  CheckoutReservationDTO,
  CreateReservationDTO,
  GetAllReservationsDTO,
  GetOneReservationDTO,
} from "./reservationsInterface";
import {
  checkinReservationSchema,
  checkoutReservationSchema,
  createReservationSchema,
  getAllReservationsSchema,
  getOneReservationSchema,
} from "./reservationsSchema";
import { ReservationService } from "./reservationsService";

export class ReservationController {
  static async create(params: CreateReservationDTO) {
    const value = validate(params, createReservationSchema);
    const data = await ReservationService.create(value);

    return {
      data,
      message: "Reservation created successfully",
    };
  }

  static async getAll(params: GetAllReservationsDTO) {
    const value = validate(params, getAllReservationsSchema);
    const data = await ReservationService.getAll(value);

    return {
      data,
      message: "Reservations fetched successfully",
    };
  }

  static async getOne(params: GetOneReservationDTO) {
    const value = validate(params, getOneReservationSchema);
    const data = await ReservationService.getOne(value);

    return {
      data,
      message: "Reservation fetched successfully",
    };
  }

  static async checkin(params: CheckinReservationDTO) {
    const value = validate(params, checkinReservationSchema);
    const data = await ReservationService.checkin(value);

    return {
      data,
      message: "Reservation checked in successfully",
    };
  }

  static async checkout(params: CheckoutReservationDTO) {
    const value = validate(params, checkoutReservationSchema);
    const data = await ReservationService.checkout(value);

    return {
      data,
      message: "Reservation checked out successfully",
    };
  }
}
