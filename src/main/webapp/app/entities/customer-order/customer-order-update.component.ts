import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICustomerOrder, CustomerOrder } from 'app/shared/model/customer-order.model';
import { CustomerOrderService } from './customer-order.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer/customer.service';

@Component({
  selector: 'jhi-customer-order-update',
  templateUrl: './customer-order-update.component.html',
})
export class CustomerOrderUpdateComponent implements OnInit {
  isSaving = false;
  customers: ICustomer[] = [];

  editForm = this.fb.group({
    id: [],
    description: [null, [Validators.required, Validators.maxLength(500)]],
    placedDate: [null, [Validators.required]],
    promisedDate: [null, [Validators.required]],
    totalPrice: [null, [Validators.required, Validators.min(0)]],
    totalPaid: [null, [Validators.required, Validators.min(0)]],
    customer: [],
  });

  constructor(
    protected customerOrderService: CustomerOrderService,
    protected customerService: CustomerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerOrder }) => {
      if (!customerOrder.id) {
        const today = moment().startOf('day');
        customerOrder.placedDate = today;
        customerOrder.promisedDate = today;
      }

      this.updateForm(customerOrder);

      this.customerService.query().subscribe((res: HttpResponse<ICustomer[]>) => (this.customers = res.body || []));
    });
  }

  updateForm(customerOrder: ICustomerOrder): void {
    this.editForm.patchValue({
      id: customerOrder.id,
      description: customerOrder.description,
      placedDate: customerOrder.placedDate ? customerOrder.placedDate.format(DATE_TIME_FORMAT) : null,
      promisedDate: customerOrder.promisedDate ? customerOrder.promisedDate.format(DATE_TIME_FORMAT) : null,
      totalPrice: customerOrder.totalPrice,
      totalPaid: customerOrder.totalPaid,
      customer: customerOrder.customer,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customerOrder = this.createFromForm();
    if (customerOrder.id !== undefined) {
      this.subscribeToSaveResponse(this.customerOrderService.update(customerOrder));
    } else {
      this.subscribeToSaveResponse(this.customerOrderService.create(customerOrder));
    }
  }

  private createFromForm(): ICustomerOrder {
    return {
      ...new CustomerOrder(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      placedDate: this.editForm.get(['placedDate'])!.value ? moment(this.editForm.get(['placedDate'])!.value, DATE_TIME_FORMAT) : undefined,
      promisedDate: this.editForm.get(['promisedDate'])!.value
        ? moment(this.editForm.get(['promisedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      totalPrice: this.editForm.get(['totalPrice'])!.value,
      totalPaid: this.editForm.get(['totalPaid'])!.value,
      customer: this.editForm.get(['customer'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerOrder>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ICustomer): any {
    return item.id;
  }
}
