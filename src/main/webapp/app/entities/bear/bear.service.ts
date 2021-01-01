import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBear } from 'app/shared/model/bear.model';

type EntityResponseType = HttpResponse<IBear>;
type EntityArrayResponseType = HttpResponse<IBear[]>;

@Injectable({ providedIn: 'root' })
export class BearService {
  public resourceUrl = SERVER_API_URL + 'api/bears';

  constructor(protected http: HttpClient) {}

  create(bear: IBear): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bear);
    return this.http
      .post<IBear>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(bear: IBear): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bear);
    return this.http
      .put<IBear>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBear>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBear[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(bear: IBear): IBear {
    const copy: IBear = Object.assign({}, bear, {
      dateAdded: bear.dateAdded && bear.dateAdded.isValid() ? bear.dateAdded.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateAdded = res.body.dateAdded ? moment(res.body.dateAdded) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((bear: IBear) => {
        bear.dateAdded = bear.dateAdded ? moment(bear.dateAdded) : undefined;
      });
    }
    return res;
  }
}
