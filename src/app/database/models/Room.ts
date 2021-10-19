import { BaseModel } from "./BaseModel";

export class Room extends BaseModel {
  static tableName = "rooms";

  readonly id?: number;
  room_type: string;
  hourly_rate: number;
  overstay_weekday_rate: number;
  overstay_weekend_rate?: number;

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "room_type",
        "hourly_rate",
        "overstay_weekday_rate",
        "overstay_weekend_rate",
      ],
      properties: {
        id: { type: "number" },
        room_type: { type: "string" },
        hourly_rate: { type: "number" },
        overstay_weekday_rate: { type: "number" },
        overstay_weekend_rate: { type: "number" },
      },
    };
  }
}
