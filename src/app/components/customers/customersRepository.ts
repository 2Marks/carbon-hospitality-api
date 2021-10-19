import { Customer } from "../../database/models";
import { CreateCustomerDTO, GetAllCustomersDTO } from "./customersInterface";

export class CustomerRepository {
  static async create(params: CreateCustomerDTO) {
    return await Customer.query().insert(params);
  }

  static async getAll(params: GetAllCustomersDTO) {
    return await Customer.query().page(params.page - 1, params.per_page);
  }

  static async getById(id: number) {
    return await Customer.query().findById(id);
  }

  static async getByName(name: string) {
    return await Customer.query().findOne({ name });
  }

  static async update(params: any) {
    return params;
  }

  static async delete(params: any) {
    return params;
  }
}
