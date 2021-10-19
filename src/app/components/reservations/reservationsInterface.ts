export enum ReservationStatus {
  paid = "paid",
  pendingPayment = "pending_payment",
}

export interface ReservationProps {
  readonly id?: number;
  customer_id: number;
  room_id: number;
  room_type: string;
  status: ReservationStatus;
  hourly_rate: number;
  expected_checkin_time: Date;
  expected_checkout_time: Date;
  checkin_time?: Date;
  checkout_time?: Date;
}

export interface CreateReservationDTO {
  customer_id: number;
  room_id: number;
  status: ReservationStatus;
  expected_checkin_time: Date;
  expected_checkout_time: Date;
  checkin_time?: Date;
}

export interface GetAllReservationsDTO {
  page: number;
  per_page: number;
}

export interface GetOneReservationDTO {
  id: number;
}

export interface CheckinReservationDTO {
  id: number;
  checkin_time: Date;
}

export interface CheckoutReservationDTO {
  id: number;
  checkout_time: Date;
}
