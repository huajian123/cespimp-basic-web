import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { BasicInfoRoutingModule } from './basic-info-routing.module';
import { BasicInfoManageComponent } from './basic-info-manage/basic-info-manage.component';
import { BasicInfoDetailComponent } from './basic-info-manage/basic-info-detail/basic-info-detail.component';
import { BasicInfoEditAddComponent } from './basic-info-manage/basic-info-edit-add/basic-info-edit-add.component';
import { BasicInfoBasicInfoAuditListComponent } from './basic-info-audit-list/basic-info-audit-list.component';
import { BasicInfoBasicInfoStatisticsComponent } from './basic-info-statistics/basic-info-statistics.component';


const COMPONENTS = [
  BasicInfoManageComponent,
  BasicInfoDetailComponent,
  BasicInfoEditAddComponent,
  BasicInfoBasicInfoAuditListComponent,
  BasicInfoBasicInfoStatisticsComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    BasicInfoRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class BasicInfoModule { }
