import { BaseModel } from "./BaseModel";

export class Customer extends BaseModel {
  static tableName = "customers";

  readonly id?: number;
  name: string;
  address?: string;
  phone_number?: string;

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        address: { type: "string" },
        phone_number: { type: "string" },
      },
    };
  }

  static modifiers = {
    selectForReservations(query: any) {
      query.select(["name", "address", "phone_number"]);
    },
  };
}
