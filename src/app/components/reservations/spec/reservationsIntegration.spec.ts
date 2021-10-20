process.env.DATABASE_NAME = "carbon_hospitality_reservation_test";

import app from "../../../app";
import request from "supertest";
import { reservationMockPayloads } from "./reservationsMockData";
import { db } from "../../../database";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { seedHandler } = require("../../../../../bin/dbOperations");

beforeAll(async () => {
  await db.migrate.latest({ directory: "./src/app/database/migrations" });
  await seedHandler("all");
});

afterAll(async () => {
  await db("reservations").truncate();
});

describe("#Create reservation", () => {
  it("should create a reservation successfully", async () => {
    const payload = reservationMockPayloads.createReservation;
    const res = await request(app).post("/api/v1/reservations").send(payload);

    expect(res.body.success).toBeTruthy();
    expect(res.body.message).toEqual("Reservation created successfully");
    expect(res.body).toHaveProperty("data");
  });

  it("should throw error if customer has ongoing reservation", async () => {
    const payload = reservationMockPayloads.createReservation;
    const res = await request(app).post("/api/v1/reservations").send(payload);

    expect(res.body.success).toBeFalsy();
    expect(res.body.message).toEqual(
      "Customer has a current reservation, kindly checkout existing reservation to create a new one"
    );
    expect(res.body.errorType).toEqual("UNPROCESSABLE_ENTITY");
  });
});

describe("#Checkin reservation", () => {
  it("should checkin a reservation successfully", async () => {
    const payload = reservationMockPayloads.checkin;
    const res = await request(app)
      .patch(`/api/v1/reservations/${payload.id}/checkin`)
      .send(payload);

    expect(res.body.success).toBeTruthy();
    expect(res.body.message).toEqual("Reservation checked in successfully");
    expect(new Date(res.body.data.checkin_time).getTime()).toEqual(
      new Date(payload.checkin_time).getTime()
    );
  });

  it("should throw error if customer has already checked in", async () => {
    const payload = reservationMockPayloads.checkin;
    const res = await request(app)
      .patch(`/api/v1/reservations/${payload.id}/checkin`)
      .send(payload);

    expect(res.body.success).toBeFalsy();
    expect(res.body.errorType).toEqual("UNPROCESSABLE_ENTITY");
  });

  it("should throw error when reservation is not found", async () => {
    const payload = reservationMockPayloads.checkinNonExistentReservation;
    const res = await request(app)
      .patch(`/api/v1/reservations/${payload.id}/checkin`)
      .send(payload);

    expect(res.body.success).toBeFalsy();
    expect(res.body.message).toEqual("Reservation not found");
    expect(res.body.errorType).toEqual("RESOURCE_NOT_FOUND");
  });
});

describe("#Checkout reservation", () => {
  it("should throw error if checkin time is greater than checkout time", async () => {
    const payload = reservationMockPayloads.checkoutLessThanCheckin;
    const res = await request(app)
      .patch(`/api/v1/reservations/${payload.id}/checkout`)
      .send(payload);

    expect(res.body.success).toBeFalsy();
    expect(res.body.errorType).toEqual("UNPROCESSABLE_ENTITY");
    expect(res.body.message).toEqual(
      "Checkout time should be greater than check in time"
    );
  });

  it("should checkout a reservation successfully", async () => {
    const payload = reservationMockPayloads.checkout;
    const res = await request(app)
      .patch(`/api/v1/reservations/${payload.id}/checkout`)
      .send(payload);

    expect(res.body.success).toBeTruthy();
    expect(res.body.message).toEqual("Reservation checked out successfully");
    expect(new Date(res.body.data.checkout_time).getTime()).toEqual(
      new Date(payload.checkout_time).getTime()
    );
  });

  it("should throw error if customer has already checked out", async () => {
    const payload = reservationMockPayloads.checkout;
    const res = await request(app)
      .patch(`/api/v1/reservations/${payload.id}/checkout`)
      .send(payload);

    expect(res.body.success).toBeFalsy();
    expect(res.body.errorType).toEqual("UNPROCESSABLE_ENTITY");
  });

  it("should throw error when reservation is not found", async () => {
    const payload = reservationMockPayloads.checkoutNonExistentReservation;
    const res = await request(app)
      .patch(`/api/v1/reservations/${payload.id}/checkout`)
      .send(payload);

    expect(res.body.success).toBeFalsy();
    expect(res.body.message).toEqual("Reservation not found");
    expect(res.body.errorType).toEqual("RESOURCE_NOT_FOUND");
  });
});
