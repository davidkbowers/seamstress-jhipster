import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model/customer.model';

export interface ICustomerOrder {
  id?: number;
  description?: string;
  placedDate?: Moment;
  promisedDate?: Moment;
  totalPrice?: number;
  totalPaid?: number;
  customer?: ICustomer;
}

export class CustomerOrder implements ICustomerOrder {
  constructor(
    public id?: number,
    public description?: string,
    public placedDate?: Moment,
    public promisedDate?: Moment,
    public totalPrice?: number,
    public totalPaid?: number,
    public customer?: ICustomer
  ) {}
}
