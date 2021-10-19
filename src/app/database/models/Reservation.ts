import { BaseModel } from "./BaseModel";
import { Customer } from "./Customer";
import { Room } from "./Room";

export class Reservation extends BaseModel {
  static tableName = "reservations";

  readonly id?: number;
  customer_id: number;
  room_id: number;
  room_type: string;
  status: string;
  expected_checkin_time: Date;
  expected_checkout_time: Date;
  checkin_time?: Date;
  checkout_time?: Date;
  hourly_rate: number;

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "customer_id",
        "room_id",
        "room_type",
        "status",
        "expected_checkin_time",
        "expected_checkout_time",
        "hourly_rate",
      ],
      properties: {
        id: { type: "number" },
        customer_id: { type: "number" },
        room_id: { type: "number" },
        room_type: { type: "string" },
        status: { type: "string" },
        expected_checkin_time: { type: "date" },
        expected_checkout_time: { type: "date" },
        checkin_time: { type: "date" },
        checkout_time: { type: "date" },
        hourly_rate: { type: "number" },
      },
    };
  }

  static relationMappings = {
    customer: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: Customer,
      join: {
        from: "reservations.customer_id",
        to: "customers.id",
      },
    },
    room: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: Room,
      join: {
        from: "reservations.room_id",
        to: "rooms.id",
      },
    },
  };
}
