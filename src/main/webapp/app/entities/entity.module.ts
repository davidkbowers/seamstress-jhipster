import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.SeamstressOnCallCustomerModule),
      },
      {
        path: 'customer-order',
        loadChildren: () => import('./customer-order/customer-order.module').then(m => m.SeamstressOnCallCustomerOrderModule),
      },
      {
        path: 'bear',
        loadChildren: () => import('./bear/bear.module').then(m => m.SeamstressOnCallBearModule),
      },
      {
        path: 'seamstress',
        loadChildren: () => import('./seamstress/seamstress.module').then(m => m.SeamstressOnCallSeamstressModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class SeamstressOnCallEntityModule {}
