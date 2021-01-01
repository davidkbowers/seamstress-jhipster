import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeamstressOnCallSharedModule } from 'app/shared/shared.module';
import { BearComponent } from './bear.component';
import { BearDetailComponent } from './bear-detail.component';
import { BearUpdateComponent } from './bear-update.component';
import { BearDeleteDialogComponent } from './bear-delete-dialog.component';
import { bearRoute } from './bear.route';

@NgModule({
  imports: [SeamstressOnCallSharedModule, RouterModule.forChild(bearRoute)],
  declarations: [BearComponent, BearDetailComponent, BearUpdateComponent, BearDeleteDialogComponent],
  entryComponents: [BearDeleteDialogComponent],
})
export class SeamstressOnCallBearModule {}
