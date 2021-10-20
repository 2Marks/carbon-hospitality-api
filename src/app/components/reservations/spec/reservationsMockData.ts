export const reservationMockPayloads = {
  createReservation: {
    customer_id: 1,
    room_id: 1,
    status: "paid",
    expected_checkin_time: "2021-09-01 10:00:00",
    expected_checkout_time: "2021-09-01 17:00:00",
  },
  checkin: {
    id: 1,
    checkin_time: "2021-09-01 10:05:00",
  },
  checkinNonExistentReservation: {
    id: 20,
    checkin_time: "2021-09-01 10:05:00",
  },
  checkout: {
    id: 1,
    checkout_time: "2021-09-01 19:05:00",
  },
  checkoutNonExistentReservation: {
    id: 20,
    checkout_time: "2021-09-01 19:05:00",
  },
  checkoutLessThanCheckin: {
    id: 1,
    checkout_time: "2021-09-01 08:05:00",
  },
};
