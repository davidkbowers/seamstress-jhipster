import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISeamstress } from 'app/shared/model/seamstress.model';
import { SeamstressService } from './seamstress.service';

@Component({
  templateUrl: './seamstress-delete-dialog.component.html',
})
export class SeamstressDeleteDialogComponent {
  seamstress?: ISeamstress;

  constructor(
    protected seamstressService: SeamstressService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.seamstressService.delete(id).subscribe(() => {
      this.eventManager.broadcast('seamstressListModification');
      this.activeModal.close();
    });
  }
}
