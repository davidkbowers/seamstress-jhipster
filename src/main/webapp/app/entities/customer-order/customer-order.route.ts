import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICustomerOrder, CustomerOrder } from 'app/shared/model/customer-order.model';
import { CustomerOrderService } from './customer-order.service';
import { CustomerOrderComponent } from './customer-order.component';
import { CustomerOrderDetailComponent } from './customer-order-detail.component';
import { CustomerOrderUpdateComponent } from './customer-order-update.component';

@Injectable({ providedIn: 'root' })
export class CustomerOrderResolve implements Resolve<ICustomerOrder> {
  constructor(private service: CustomerOrderService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICustomerOrder> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((customerOrder: HttpResponse<CustomerOrder>) => {
          if (customerOrder.body) {
            return of(customerOrder.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CustomerOrder());
  }
}

export const customerOrderRoute: Routes = [
  {
    path: '',
    component: CustomerOrderComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'CustomerOrders',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CustomerOrderDetailComponent,
    resolve: {
      customerOrder: CustomerOrderResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'CustomerOrders',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CustomerOrderUpdateComponent,
    resolve: {
      customerOrder: CustomerOrderResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'CustomerOrders',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CustomerOrderUpdateComponent,
    resolve: {
      customerOrder: CustomerOrderResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'CustomerOrders',
    },
    canActivate: [UserRouteAccessService],
  },
];
