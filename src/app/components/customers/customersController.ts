import { validate } from "../../helpers";
import {
  CreateCustomerDTO,
  GetAllCustomersDTO,
  GetOneCustomerDTO,
} from "./customersInterface";
import {
  createCustomerSchema,
  getAllCustomersSchema,
  getOneCustomerSchema,
} from "./customersSchema";
import { CustomerService } from "./customersService";

export class CustomerController {
  static async create(params: CreateCustomerDTO) {
    const value = validate(params, createCustomerSchema);
    const data = await CustomerService.create(value);

    return {
      data,
      message: "Customer created successfully",
    };
  }

  static async getAll(params: GetAllCustomersDTO) {
    const value = validate(params, getAllCustomersSchema);
    const data = await CustomerService.getAll(value);

    return {
      data,
      message: "Customers fetched successfully",
    };
  }

  static async getOne(params: GetOneCustomerDTO) {
    const value = validate(params, getOneCustomerSchema);
    const data = await CustomerService.getOne(value);

    return {
      data,
      message: "Customer fetched successfully",
    };
  }
}
