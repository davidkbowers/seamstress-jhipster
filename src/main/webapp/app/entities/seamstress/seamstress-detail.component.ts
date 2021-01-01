import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISeamstress } from 'app/shared/model/seamstress.model';

@Component({
  selector: 'jhi-seamstress-detail',
  templateUrl: './seamstress-detail.component.html',
})
export class SeamstressDetailComponent implements OnInit {
  seamstress: ISeamstress | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ seamstress }) => (this.seamstress = seamstress));
  }

  previousState(): void {
    window.history.back();
  }
}
