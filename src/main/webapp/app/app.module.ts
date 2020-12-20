import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  imports: [
    BrowserModule,
    SeamstressOnCallSharedModule,
    SeamstressOnCallCoreModule,
    SeamstressOnCallHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    SeamstressOnCallEntityModule,
    SeamstressOnCallAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class SeamstressOnCallAppModule {}
