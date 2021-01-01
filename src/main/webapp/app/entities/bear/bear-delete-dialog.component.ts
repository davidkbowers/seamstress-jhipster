import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBear } from 'app/shared/model/bear.model';
import { BearService } from './bear.service';

@Component({
  templateUrl: './bear-delete-dialog.component.html',
})
export class BearDeleteDialogComponent {
  bear?: IBear;

  constructor(protected bearService: BearService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.bearService.delete(id).subscribe(() => {
      this.eventManager.broadcast('bearListModification');
      this.activeModal.close();
    });
  }
}
