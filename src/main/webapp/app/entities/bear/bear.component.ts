import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBear } from 'app/shared/model/bear.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { BearService } from './bear.service';
import { BearDeleteDialogComponent } from './bear-delete-dialog.component';

@Component({
  selector: 'jhi-bear',
  templateUrl: './bear.component.html',
})
export class BearComponent implements OnInit, OnDestroy {
  bears: IBear[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected bearService: BearService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.bears = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.bearService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IBear[]>) => this.paginateBears(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.bears = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBears();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBear): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBears(): void {
    this.eventSubscriber = this.eventManager.subscribe('bearListModification', () => this.reset());
  }

  delete(bear: IBear): void {
    const modalRef = this.modalService.open(BearDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.bear = bear;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateBears(data: IBear[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.bears.push(data[i]);
      }
    }
  }
}
