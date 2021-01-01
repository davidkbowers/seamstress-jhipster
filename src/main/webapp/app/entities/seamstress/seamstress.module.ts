import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeamstressOnCallSharedModule } from 'app/shared/shared.module';
import { SeamstressComponent } from './seamstress.component';
import { SeamstressDetailComponent } from './seamstress-detail.component';
import { SeamstressUpdateComponent } from './seamstress-update.component';
import { SeamstressDeleteDialogComponent } from './seamstress-delete-dialog.component';
import { seamstressRoute } from './seamstress.route';

@NgModule({
  imports: [SeamstressOnCallSharedModule, RouterModule.forChild(seamstressRoute)],
  declarations: [SeamstressComponent, SeamstressDetailComponent, SeamstressUpdateComponent, SeamstressDeleteDialogComponent],
  entryComponents: [SeamstressDeleteDialogComponent],
})
export class SeamstressOnCallSeamstressModule {}
