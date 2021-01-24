import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeamstressOnCallSharedModule } from 'app/shared/shared.module';
import { BEARS_ROUTE } from './bears.route';
import { BearsComponent } from './bears.component';

@NgModule({
  imports: [SeamstressOnCallSharedModule, RouterModule.forChild([BEARS_ROUTE])],
  declarations: [BearsComponent],
})
export class BearsModule {}
