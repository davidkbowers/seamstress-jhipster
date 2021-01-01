import { Moment } from 'moment';

export interface IBear {
  id?: number;
  imageFile?: string;
  description?: string;
  dateAdded?: Moment;
  sortPosition?: number;
}

export class Bear implements IBear {
  constructor(
    public id?: number,
    public imageFile?: string,
    public description?: string,
    public dateAdded?: Moment,
    public sortPosition?: number
  ) {}
}
