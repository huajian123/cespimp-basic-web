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
import { BasicInfoEnterpriseBasicInfoComponent } from './enterprise-basic-info/enterprise-basic-info.component';
import { BasicInfoCertificateInfoComponent } from './certificate-info/certificate-info.component';
import { BasicInfoBasicInfoAuditDetailComponent } from './basic-info-audit-list/basic-info-audit-detail/basic-info-audit-detail.component';
import { BasicInfoBasicInfoAuditEditAddComponent } from './basic-info-audit-list/basic-info-audit-edit-add/basic-info-audit-edit-add.component';
import { BasicInfoProductionDeviceInfoListComponent } from './production-device-info-list/production-device-info-list.component';
import { BasicInfoProductionDeviceInfoEditAddComponent } from './production-device-info-list/production-device-info-edit-add/production-device-info-edit-add.component';
import { BasicInfoProductionDeviceInfoDetailComponent } from './production-device-info-list/production-device-info-detail/production-device-info-detail.component';


const COMPONENTS = [
  BasicInfoManageComponent,
  BasicInfoDetailComponent,
  BasicInfoEditAddComponent,
  BasicInfoBasicInfoAuditListComponent,
  BasicInfoBasicInfoStatisticsComponent,
  BasicInfoEnterpriseSurroundingInfoListComponent,
  BasicInfoProductionMaterialsInfoListComponent,
  BasicInfoIntermediateProductInfoListComponent,
  BasicInfoFinalProductInfoListComponent,
  BasicInfoEnterpriseBasicInfoComponent,
  BasicInfoCertificateInfoComponent,
  BasicInfoBasicInfoAuditEditAddComponent,
  BasicInfoProductionDeviceInfoListComponent];
const COMPONENTS_NOROUNT = [
  BasicInfoBasicInfoAuditDetailComponent,
  BasicInfoProductionDeviceInfoEditAddComponent,
  BasicInfoProductionDeviceInfoEditAddComponent,
  BasicInfoProductionDeviceInfoDetailComponent];

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
