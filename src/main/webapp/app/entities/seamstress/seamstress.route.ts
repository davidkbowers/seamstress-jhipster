import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISeamstress, Seamstress } from 'app/shared/model/seamstress.model';
import { SeamstressService } from './seamstress.service';
import { SeamstressComponent } from './seamstress.component';
import { SeamstressDetailComponent } from './seamstress-detail.component';
import { SeamstressUpdateComponent } from './seamstress-update.component';

@Injectable({ providedIn: 'root' })
export class SeamstressResolve implements Resolve<ISeamstress> {
  constructor(private service: SeamstressService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISeamstress> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((seamstress: HttpResponse<Seamstress>) => {
          if (seamstress.body) {
            return of(seamstress.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Seamstress());
  }
}

export const seamstressRoute: Routes = [
  {
    path: '',
    component: SeamstressComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Seamstresses',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SeamstressDetailComponent,
    resolve: {
      seamstress: SeamstressResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Seamstresses',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SeamstressUpdateComponent,
    resolve: {
      seamstress: SeamstressResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Seamstresses',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SeamstressUpdateComponent,
    resolve: {
      seamstress: SeamstressResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Seamstresses',
    },
    canActivate: [UserRouteAccessService],
  },
];
