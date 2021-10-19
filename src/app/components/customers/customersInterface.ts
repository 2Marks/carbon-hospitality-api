export interface CreateCustomerDTO {
  name: string;
  email?: string;
  address?: string;
  phone_number: string;
}

export interface GetAllCustomersDTO {
  page: number;
  per_page: number;
}

export interface GetOneCustomerDTO {
  id: number;
}
