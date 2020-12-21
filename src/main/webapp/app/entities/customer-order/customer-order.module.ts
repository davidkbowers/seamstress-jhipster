import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeamstressOnCallSharedModule } from 'app/shared/shared.module';
import { CustomerOrderComponent } from './customer-order.component';
import { CustomerOrderDetailComponent } from './customer-order-detail.component';
import { CustomerOrderUpdateComponent } from './customer-order-update.component';
import { CustomerOrderDeleteDialogComponent } from './customer-order-delete-dialog.component';
import { customerOrderRoute } from './customer-order.route';

@NgModule({
  imports: [SeamstressOnCallSharedModule, RouterModule.forChild(customerOrderRoute)],
  declarations: [CustomerOrderComponent, CustomerOrderDetailComponent, CustomerOrderUpdateComponent, CustomerOrderDeleteDialogComponent],
  entryComponents: [CustomerOrderDeleteDialogComponent],
})
export class SeamstressOnCallCustomerOrderModule {}
