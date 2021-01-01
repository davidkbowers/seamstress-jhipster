import { Moment } from 'moment';

export interface ISeamstress {
  id?: number;
  imageFile?: string;
  description?: string;
  dateAdded?: Moment;
  sortPosition?: number;
}

export class Seamstress implements ISeamstress {
  constructor(
    public id?: number,
    public imageFile?: string,
    public description?: string,
    public dateAdded?: Moment,
    public sortPosition?: number
  ) {}
}
