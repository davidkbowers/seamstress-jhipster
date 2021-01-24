import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, CurrencyPipe } from '@angular/common';

import './vendor';
import { SeamstressOnCallSharedModule } from 'app/shared/shared.module';
import { SeamstressOnCallCoreModule } from 'app/core/core.module';
import { SeamstressOnCallAppRoutingModule } from './app-routing.module';
import { SeamstressOnCallHomeModule } from './home/home.module';
import { SeamstressOnCallEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';
import { BearsModule } from './bears/bears.module';

@NgModule({
  imports: [
    BrowserModule,
    SeamstressOnCallSharedModule,
    SeamstressOnCallCoreModule,
    SeamstressOnCallHomeModule,
    BearsModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    SeamstressOnCallEntityModule,
    SeamstressOnCallAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
  providers: [CurrencyPipe],
})
export class SeamstressOnCallAppModule {}
