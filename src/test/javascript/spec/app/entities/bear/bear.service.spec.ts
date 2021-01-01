import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { BearService } from 'app/entities/bear/bear.service';
import { IBear, Bear } from 'app/shared/model/bear.model';

describe('Service Tests', () => {
  describe('Bear Service', () => {
    let injector: TestBed;
    let service: BearService;
    let httpMock: HttpTestingController;
    let elemDefault: IBear;
    let expectedResult: IBear | IBear[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(BearService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Bear(0, 'AAAAAAA', 'AAAAAAA', currentDate, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateAdded: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Bear', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateAdded: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateAdded: currentDate,
          },
          returnedFromService
        );

        service.create(new Bear()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Bear', () => {
        const returnedFromService = Object.assign(
          {
            imageFile: 'BBBBBB',
            description: 'BBBBBB',
            dateAdded: currentDate.format(DATE_FORMAT),
            sortPosition: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateAdded: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Bear', () => {
        const returnedFromService = Object.assign(
          {
            imageFile: 'BBBBBB',
            description: 'BBBBBB',
            dateAdded: currentDate.format(DATE_FORMAT),
            sortPosition: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateAdded: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Bear', () => {
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
