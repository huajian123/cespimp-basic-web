import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { BasicInfoRoutingModule } from './basic-info-routing.module';
import { BasicInfoManageComponent } from './basic-info-manage/basic-info-manage.component';
import { BasicInfoDetailComponent } from './basic-info-manage/basic-info-detail/basic-info-detail.component';
import { BasicInfoEditAddComponent } from './basic-info-manage/basic-info-edit-add/basic-info-edit-add.component';
import { BasicInfoBasicInfoAuditListComponent } from './basic-info-audit-list/basic-info-audit-list.component';
import { BasicInfoBasicInfoStatisticsComponent } from './basic-info-statistics/basic-info-statistics.component';
import { BasicInfoEnterpriseSurroundingInfoListComponent } from './enterprise-surrounding-info-list/enterprise-surrounding-info-list.component';
import { BasicInfoProductionMaterialsInfoListComponent } from './production-materials-info-list/production-materials-info-list.component';
import { BasicInfoIntermediateProductInfoListComponent } from './intermediate-product-info-list/intermediate-product-info-list.component';
import { BasicInfoFinalProductInfoListComponent } from './final-product-info-list/final-product-info-list.component';


const COMPONENTS = [
  BasicInfoManageComponent,
  BasicInfoDetailComponent,
  BasicInfoEditAddComponent,
  BasicInfoBasicInfoAuditListComponent,
  BasicInfoBasicInfoStatisticsComponent,
  BasicInfoEnterpriseSurroundingInfoListComponent,
  BasicInfoProductionMaterialsInfoListComponent,
  BasicInfoIntermediateProductInfoListComponent,
  BasicInfoFinalProductInfoListComponent];
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
