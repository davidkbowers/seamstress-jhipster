import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SeamstressService } from 'app/entities/seamstress/seamstress.service';
import { ISeamstress, Seamstress } from 'app/shared/model/seamstress.model';

describe('Service Tests', () => {
  describe('Seamstress Service', () => {
    let injector: TestBed;
    let service: SeamstressService;
    let httpMock: HttpTestingController;
    let elemDefault: ISeamstress;
    let expectedResult: ISeamstress | ISeamstress[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(SeamstressService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Seamstress(0, 'AAAAAAA', 'AAAAAAA', currentDate, 0);
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

      it('should create a Seamstress', () => {
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

        service.create(new Seamstress()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Seamstress', () => {
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

      it('should return a list of Seamstress', () => {
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

      it('should delete a Seamstress', () => {
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
