import { raw } from "../../database";
import { Reservation } from "../../database/models";
import {
  CheckinReservationDTO,
  CheckoutReservationDTO,
  GetAllReservationsDTO,
  ReservationProps,
} from "./reservationsInterface";

export class ReservationRepository {
  static async create(params: Partial<ReservationProps>) {
    return await Reservation.query().insert(params);
  }

  static async getAll(params: GetAllReservationsDTO) {
    return await Reservation.query()
      .leftJoinRelated("customer")
      .leftJoin("rooms", "reservations.room_id", "rooms.id")
      .select([
        "reservations.*",
        raw("customer.name as customer_name"),
        raw(`
            IF(
                checkout_time IS NOT NULL && checkout_time > expected_checkout_time,
                TIMESTAMPDIFF(HOUR, expected_checkout_time, checkout_time)+1,
                0
            ) overstay_hours
        `),
        raw(`
            ROUND(
                IF(
                    checkout_time IS NOT NULL && checkout_time > expected_checkout_time,
                    IFNULL(
                        IF(
                            WEEKDAY(reservations.checkout_time) > 4,
                            (TIMESTAMPDIFF(HOUR, expected_checkout_time, checkout_time)+1) * (reservations.hourly_rate * overstay_weekend_rate/100),
                            (TIMESTAMPDIFF(HOUR, expected_checkout_time, checkout_time)+1) * (reservations.hourly_rate * overstay_weekday_rate/100)
                        )
                    , 0),
                    0
                )
            , 2) overstay_fee
        `),
      ])
      .page(params.page - 1, params.per_page);
  }

  static async getOne(id: number) {
    return await Reservation.query()
      .findById(id)
      .eager("customer(selectForReservations)");
  }

  static async getById(id: number) {
    return await Reservation.query().findById(id);
  }

  static async getOngoingReservationCount(customerId: number) {
    return await Reservation.query()
      .where("customer_id", customerId)
      .whereNull("checkout_time")
      .resultSize();
  }

  static async checkin(params: CheckinReservationDTO) {
    return await Reservation.query().patchAndFetchById(params.id, {
      checkin_time: params.checkin_time,
    });
  }

  static async checkout(params: CheckoutReservationDTO) {
    return await Reservation.query().patchAndFetchById(params.id, {
      checkout_time: params.checkout_time,
    });
  }
}
