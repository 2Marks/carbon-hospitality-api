process.env.DATABASE_NAME = "carbon_hospitality_reservation_test";

import app from "../../../app";
import request from "supertest";
import { customerMockPayloads } from "./customersMockData";
import { db } from "../../../database";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { seedHandler } = require("../../../../../bin/dbOperations");

beforeAll(async () => {
  await db.migrate.latest({ directory: "./src/app/database/migrations" });
  await seedHandler("all");
});

describe("#Create customer", () => {
  it("should create a customer successfully", async () => {
    const payload = customerMockPayloads.create;
    const res = await request(app).post("/api/v1/customers").send(payload);

    expect(res.body.success).toBeTruthy();
    expect(res.body.message).toEqual("Customer created successfully");
    expect(res.body).toHaveProperty("data");
  });

  it("should throw error if customer already exists", async () => {
    const payload = customerMockPayloads.create;
    const res = await request(app).post("/api/v1/customers").send(payload);

    expect(res.body.success).toBeFalsy();
    expect(res.body.message).toEqual(
      `Customer with name (${payload.name}) already exist`
    );
  });
});

describe("#Get all customers", () => {
  it("should get all customers successfully", async () => {
    const payload = customerMockPayloads.getAll;
    const res = await request(app).get("/api/v1/customers").send(payload);

    expect(res.body.success).toBeTruthy();
    expect(res.body.message).toEqual("Customers fetched successfully");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.total).toBeGreaterThan(0);
  });
});

describe("#Get a customer", () => {
  it("should get a customer successfully", async () => {
    const res = await request(app).get("/api/v1/customers/1").send();

    expect(res.body.success).toBeTruthy();
    expect(res.body.message).toEqual("Customer fetched successfully");
    expect(res.body).toHaveProperty("data");
  });

  it("should throw error if customer is not found", async () => {
    const nonExistentCustomerId = 20;
    const res = await request(app)
      .get(`/api/v1/customers/${nonExistentCustomerId}`)
      .send();

    expect(res.body.success).toBeFalsy();
    expect(res.body.message).toEqual("Customer not found");
  });
});
