import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerOrder } from 'app/shared/model/customer-order.model';
import { CustomerOrderService } from './customer-order.service';

@Component({
  templateUrl: './customer-order-delete-dialog.component.html',
})
export class CustomerOrderDeleteDialogComponent {
  customerOrder?: ICustomerOrder;

  constructor(
    protected customerOrderService: CustomerOrderService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.customerOrderService.delete(id).subscribe(() => {
      this.eventManager.broadcast('customerOrderListModification');
      this.activeModal.close();
    });
  }
}
