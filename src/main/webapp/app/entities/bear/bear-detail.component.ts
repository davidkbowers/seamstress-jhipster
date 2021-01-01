import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBear } from 'app/shared/model/bear.model';

@Component({
  selector: 'jhi-bear-detail',
  templateUrl: './bear-detail.component.html',
})
export class BearDetailComponent implements OnInit {
  bear: IBear | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bear }) => (this.bear = bear));
  }

  previousState(): void {
    window.history.back();
  }
}
