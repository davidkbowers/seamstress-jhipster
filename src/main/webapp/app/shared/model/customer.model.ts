import { ICustomerOrder } from 'app/shared/model/customer-order.model';

export interface ICustomer {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  orders?: ICustomerOrder[];
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public name?: string,
    public email?: string,
    public phone?: string,
    public address?: string,
    public orders?: ICustomerOrder[]
  ) {}
}
