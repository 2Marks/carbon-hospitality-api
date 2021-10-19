import { isEmpty, isNotEmpty } from "../../helpers";
import {
  ResourceNotFoundError,
  UnprocessableEntityError,
} from "../../helpers/errors";
import { CustomerService } from "../customers";
import { RoomService } from "../rooms";
import {
  CheckinReservationDTO,
  CheckoutReservationDTO,
  CreateReservationDTO,
  GetAllReservationsDTO,
  GetOneReservationDTO,
} from "./reservationsInterface";
import { ReservationRepository } from "./reservationsRepository";

export class ReservationService {
  static async create(params: CreateReservationDTO) {
    await CustomerService.validate(params.customer_id);
    const room = await RoomService.validate(params.room_id);
    const hasOngoingReservation = await this.hasOngoingReservation(
      params.customer_id
    );

    if (hasOngoingReservation) {
      throw new UnprocessableEntityError({
        message:
          "Customer has a current reservation, kindly checkout existing reservation to create a new one",
      });
    }

    return await ReservationRepository.create({
      ...params,
      room_type: room.room_type,
      hourly_rate: room.hourly_rate,
    });
  }

  static async getAll(params: GetAllReservationsDTO) {
    return await ReservationRepository.getAll(params);
  }

  static async getOne(params: GetOneReservationDTO) {
    const reservation = await ReservationRepository.getOne(params.id);

    if (isEmpty(reservation)) {
      throw new ResourceNotFoundError({ message: "Reservation not found" });
    }

    return reservation;
  }

  static async checkin(params: CheckinReservationDTO) {
    const reservation = await this.validate(params.id);
    const hasCheckedIn = isNotEmpty(reservation.checkin_time);

    if (hasCheckedIn) {
      throw new UnprocessableEntityError({
        message: `Customer has already been checked in at ${reservation.checkin_time}`,
      });
    }

    return await ReservationRepository.checkin(params);
  }

  static async checkout(params: CheckoutReservationDTO) {
    const reservation = await this.validate(params.id);
    const hasNotCheckedIn = isEmpty(reservation.checkin_time);

    if (hasNotCheckedIn) {
      throw new UnprocessableEntityError({
        message:
          "Customer has not been checked in. Kindly check the Customer in first",
      });
    }

    const hasCheckedOut = isNotEmpty(reservation.checkout_time);
    if (hasCheckedOut) {
      throw new UnprocessableEntityError({
        message: "Customer has already been checked out",
      });
    }

    const checkinTime = (reservation.checkin_time as Date).getTime();
    const isNotValidTime = checkinTime >= params.checkout_time.getTime();
    if (isNotValidTime) {
      throw new UnprocessableEntityError({
        message: `Checkout time should be greater than check in time`,
      });
    }

    return await ReservationRepository.checkout(params);
  }

  private static async hasOngoingReservation(customerId: number) {
    const ongoingReservationCount =
      await ReservationRepository.getOngoingReservationCount(customerId);

    return ongoingReservationCount > 0;
  }

  private static async validate(id: number) {
    const reservation = await ReservationRepository.getById(id);

    if (isEmpty(reservation)) {
      throw new ResourceNotFoundError({ message: "Reservation not found" });
    }

    return reservation;
  }
}
