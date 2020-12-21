import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CustomerOrderService } from 'app/entities/customer-order/customer-order.service';
import { ICustomerOrder, CustomerOrder } from 'app/shared/model/customer-order.model';

describe('Service Tests', () => {
  describe('CustomerOrder Service', () => {
    let injector: TestBed;
    let service: CustomerOrderService;
    let httpMock: HttpTestingController;
    let elemDefault: ICustomerOrder;
    let expectedResult: ICustomerOrder | ICustomerOrder[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CustomerOrderService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new CustomerOrder(0, 'AAAAAAA', currentDate, currentDate, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            placedDate: currentDate.format(DATE_TIME_FORMAT),
            promisedDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a CustomerOrder', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            placedDate: currentDate.format(DATE_TIME_FORMAT),
            promisedDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            placedDate: currentDate,
            promisedDate: currentDate,
          },
          returnedFromService
        );

        service.create(new CustomerOrder()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CustomerOrder', () => {
        const returnedFromService = Object.assign(
          {
            description: 'BBBBBB',
            placedDate: currentDate.format(DATE_TIME_FORMAT),
            promisedDate: currentDate.format(DATE_TIME_FORMAT),
            totalPrice: 1,
            totalPaid: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            placedDate: currentDate,
            promisedDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CustomerOrder', () => {
        const returnedFromService = Object.assign(
          {
            description: 'BBBBBB',
            placedDate: currentDate.format(DATE_TIME_FORMAT),
            promisedDate: currentDate.format(DATE_TIME_FORMAT),
            totalPrice: 1,
            totalPaid: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            placedDate: currentDate,
            promisedDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a CustomerOrder', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
