import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBear, Bear } from 'app/shared/model/bear.model';
import { BearService } from './bear.service';

@Component({
  selector: 'jhi-bear-update',
  templateUrl: './bear-update.component.html',
})
export class BearUpdateComponent implements OnInit {
  isSaving = false;
  dateAddedDp: any;

  editForm = this.fb.group({
    id: [],
    imageFile: [null, [Validators.required]],
    description: [],
    dateAdded: [],
    sortPosition: [],
  });

  constructor(protected bearService: BearService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bear }) => {
      this.updateForm(bear);
    });
  }

  updateForm(bear: IBear): void {
    this.editForm.patchValue({
      id: bear.id,
      imageFile: bear.imageFile,
      description: bear.description,
      dateAdded: bear.dateAdded,
      sortPosition: bear.sortPosition,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bear = this.createFromForm();
    if (bear.id !== undefined) {
      this.subscribeToSaveResponse(this.bearService.update(bear));
    } else {
      this.subscribeToSaveResponse(this.bearService.create(bear));
    }
  }

  private createFromForm(): IBear {
    return {
      ...new Bear(),
      id: this.editForm.get(['id'])!.value,
      imageFile: this.editForm.get(['imageFile'])!.value,
      description: this.editForm.get(['description'])!.value,
      dateAdded: this.editForm.get(['dateAdded'])!.value,
      sortPosition: this.editForm.get(['sortPosition'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBear>>): void {
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
}
