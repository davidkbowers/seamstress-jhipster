import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBear, Bear } from 'app/shared/model/bear.model';
import { BearService } from './bear.service';
import { BearComponent } from './bear.component';
import { BearDetailComponent } from './bear-detail.component';
import { BearUpdateComponent } from './bear-update.component';

@Injectable({ providedIn: 'root' })
export class BearResolve implements Resolve<IBear> {
  constructor(private service: BearService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBear> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((bear: HttpResponse<Bear>) => {
          if (bear.body) {
            return of(bear.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Bear());
  }
}

export const bearRoute: Routes = [
  {
    path: '',
    component: BearComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Bears',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BearDetailComponent,
    resolve: {
      bear: BearResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Bears',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BearUpdateComponent,
    resolve: {
      bear: BearResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Bears',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BearUpdateComponent,
    resolve: {
      bear: BearResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Bears',
    },
    canActivate: [UserRouteAccessService],
  },
];
