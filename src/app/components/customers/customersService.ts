import { isEmpty, isNotEmpty } from "../../helpers";
import {
  ResourceExistError,
  ResourceNotFoundError,
} from "../../helpers/errors";
import {
  CreateCustomerDTO,
  GetAllCustomersDTO,
  GetOneCustomerDTO,
} from "./customersInterface";
import { CustomerRepository } from "./customersRepository";

export class CustomerService {
  static async create(params: CreateCustomerDTO) {
    const customer = await CustomerRepository.getByName(params.name);

    if (isNotEmpty(customer)) {
      throw new ResourceExistError({
        message: `Customer with name (${params.name}) already exist`,
      });
    }

    return await CustomerRepository.create(params);
  }

  static async getAll(params: GetAllCustomersDTO) {
    return await CustomerRepository.getAll(params);
  }

  static async getOne(params: GetOneCustomerDTO) {
    const customer = await CustomerRepository.getById(params.id);

    if (isEmpty(customer)) {
      throw new ResourceNotFoundError({ message: "Customer not found" });
    }

    return customer;
  }

  static async update(params: any) {
    return params;
  }

  static async validate(id: number) {
    const customer = await CustomerRepository.getById(id);

    if (isEmpty(customer)) {
      throw new ResourceNotFoundError({ message: "Customer not found" });
    }

    return customer;
  }
}
