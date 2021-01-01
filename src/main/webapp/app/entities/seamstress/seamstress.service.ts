import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISeamstress } from 'app/shared/model/seamstress.model';

type EntityResponseType = HttpResponse<ISeamstress>;
type EntityArrayResponseType = HttpResponse<ISeamstress[]>;

@Injectable({ providedIn: 'root' })
export class SeamstressService {
  public resourceUrl = SERVER_API_URL + 'api/seamstresses';

  constructor(protected http: HttpClient) {}

  create(seamstress: ISeamstress): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(seamstress);
    return this.http
      .post<ISeamstress>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(seamstress: ISeamstress): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(seamstress);
    return this.http
      .put<ISeamstress>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISeamstress>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISeamstress[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(seamstress: ISeamstress): ISeamstress {
    const copy: ISeamstress = Object.assign({}, seamstress, {
      dateAdded: seamstress.dateAdded && seamstress.dateAdded.isValid() ? seamstress.dateAdded.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((seamstress: ISeamstress) => {
        seamstress.dateAdded = seamstress.dateAdded ? moment(seamstress.dateAdded) : undefined;
      });
    }
    return res;
  }
}
