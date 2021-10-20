process.env.DATABASE_NAME = "carbon_hospitality_reservation_test";

import app from "../../../app";
import request from "supertest";
import { roomMockPayloads } from "./roomsMockData";
import { db } from "../../../database";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { seedHandler } = require("../../../../../bin/dbOperations");

beforeAll(async () => {
  await db.migrate.latest({ directory: "./src/app/database/migrations" });
  await seedHandler("all");
});

describe("#Create customer", () => {
  it("should create a room successfully", async () => {
    const payload = roomMockPayloads.create;
    const res = await request(app).post("/api/v1/rooms").send(payload);

    expect(res.body.success).toBeTruthy();
    expect(res.body.message).toEqual("Room created successfully");
    expect(res.body).toHaveProperty("data");
  });

  it("should create a room successfully", async () => {
    const payload = roomMockPayloads.create;
    const res = await request(app).post("/api/v1/rooms").send(payload);

    expect(res.body.success).toBeFalsy();
    expect(res.body.message).toEqual("Room aleady exist");
  });
});

describe("#Get all rooms", () => {
  it("should create a room successfully", async () => {
    const payload = roomMockPayloads.getAll;
    const res = await request(app).get("/api/v1/rooms").send(payload);

    expect(res.body.success).toBeTruthy();
    expect(res.body.message).toEqual("Rooms fetched successfully");
    expect(res.body.data.total).toBeGreaterThan(0);
  });
});

describe("#Get one room", () => {
  it("should get a room successfully", async () => {
    const res = await request(app).get("/api/v1/rooms/1").send();

    expect(res.body.success).toBeTruthy();
    expect(res.body.message).toEqual("Room fetched successfully");
    expect(res.body).toHaveProperty("data");
  });

  it("should throw error when room is not found", async () => {
    const nonExistentRoomId = 20;
    const res = await request(app)
      .get(`/api/v1/rooms/${nonExistentRoomId}`)
      .send();

    expect(res.body.success).toBeFalsy();
    expect(res.body.message).toEqual("Room not found");
  });
});
