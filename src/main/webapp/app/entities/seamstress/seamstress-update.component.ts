import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISeamstress, Seamstress } from 'app/shared/model/seamstress.model';
import { SeamstressService } from './seamstress.service';

@Component({
  selector: 'jhi-seamstress-update',
  templateUrl: './seamstress-update.component.html',
})
export class SeamstressUpdateComponent implements OnInit {
  isSaving = false;
  dateAddedDp: any;

  editForm = this.fb.group({
    id: [],
    imageFile: [null, [Validators.required]],
    description: [],
    dateAdded: [],
    sortPosition: [],
  });

  constructor(protected seamstressService: SeamstressService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ seamstress }) => {
      this.updateForm(seamstress);
    });
  }

  updateForm(seamstress: ISeamstress): void {
    this.editForm.patchValue({
      id: seamstress.id,
      imageFile: seamstress.imageFile,
      description: seamstress.description,
      dateAdded: seamstress.dateAdded,
      sortPosition: seamstress.sortPosition,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const seamstress = this.createFromForm();
    if (seamstress.id !== undefined) {
      this.subscribeToSaveResponse(this.seamstressService.update(seamstress));
    } else {
      this.subscribeToSaveResponse(this.seamstressService.create(seamstress));
    }
  }

  private createFromForm(): ISeamstress {
    return {
      ...new Seamstress(),
      id: this.editForm.get(['id'])!.value,
      imageFile: this.editForm.get(['imageFile'])!.value,
      description: this.editForm.get(['description'])!.value,
      dateAdded: this.editForm.get(['dateAdded'])!.value,
      sortPosition: this.editForm.get(['sortPosition'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISeamstress>>): void {
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
