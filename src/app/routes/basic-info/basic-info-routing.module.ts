import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicInfoManageComponent} from './basic-info-manage/basic-info-manage.component';
import { BasicInfoBasicInfoAuditListComponent } from './basic-info-audit-list/basic-info-audit-list.component';
import { BasicInfoBasicInfoStatisticsComponent } from './basic-info-statistics/basic-info-statistics.component';
import { BasicInfoEnterpriseSurroundingInfoListComponent } from './enterprise-surrounding-info-list/enterprise-surrounding-info-list.component';
import { BasicInfoProductionMaterialsInfoListComponent } from './production-materials-info-list/production-materials-info-list.component';
import { BasicInfoIntermediateProductInfoListComponent } from './intermediate-product-info-list/intermediate-product-info-list.component';
import { BasicInfoFinalProductInfoListComponent } from './final-product-info-list/final-product-info-list.component';
import { BasicInfoEnterpriseBasicInfoComponent } from './enterprise-basic-info/enterprise-basic-info.component';
import { BasicInfoCertificateInfoComponent } from './certificate-info/certificate-info.component';
import { BasicInfoBasicInfoAuditEditAddComponent } from './basic-info-audit-list/basic-info-audit-edit-add/basic-info-audit-edit-add.component';


const routes: Routes = [
  { path: '', redirectTo: 'basic-info', pathMatch: 'full' },
  { path: 'basic-info', component: BasicInfoManageComponent },
  { path: 'basic-info-audit-list', component: BasicInfoBasicInfoAuditListComponent },
  { path: 'basic-info-statistics', component: BasicInfoBasicInfoStatisticsComponent },
  { path: 'enterprise-surrounding-info-list', component: BasicInfoEnterpriseSurroundingInfoListComponent },
  { path: 'production-materials-info-list', component: BasicInfoProductionMaterialsInfoListComponent },
  { path: 'intermediate-product-info-list', component: BasicInfoIntermediateProductInfoListComponent },
  { path: 'final-product-info-list', component: BasicInfoFinalProductInfoListComponent },
  { path: 'enterprise-basic-info', component: BasicInfoEnterpriseBasicInfoComponent },
  { path: 'certificate-info', component: BasicInfoCertificateInfoComponent },
  { path: 'basic-info-audit-edit-add', component: BasicInfoBasicInfoAuditEditAddComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicInfoRoutingModule {
}
