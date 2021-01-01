import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISeamstress } from 'app/shared/model/seamstress.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { SeamstressService } from './seamstress.service';
import { SeamstressDeleteDialogComponent } from './seamstress-delete-dialog.component';

@Component({
  selector: 'jhi-seamstress',
  templateUrl: './seamstress.component.html',
})
export class SeamstressComponent implements OnInit, OnDestroy {
  seamstresses: ISeamstress[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected seamstressService: SeamstressService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.seamstresses = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.seamstressService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<ISeamstress[]>) => this.paginateSeamstresses(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.seamstresses = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSeamstresses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISeamstress): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSeamstresses(): void {
    this.eventSubscriber = this.eventManager.subscribe('seamstressListModification', () => this.reset());
  }

  delete(seamstress: ISeamstress): void {
    const modalRef = this.modalService.open(SeamstressDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.seamstress = seamstress;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateSeamstresses(data: ISeamstress[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.seamstresses.push(data[i]);
      }
    }
  }
}
