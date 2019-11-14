import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicInfoManageComponent} from './basic-info-manage/basic-info-manage.component';
import { BasicInfoBasicInfoAuditListComponent } from './basic-info-audit-list/basic-info-audit-list.component';
import { BasicInfoBasicInfoStatisticsComponent } from './basic-info-statistics/basic-info-statistics.component';


const routes: Routes = [
  { path: '', redirectTo: 'basic-info', pathMatch: 'full' },
  { path: 'basic-info', component: BasicInfoManageComponent },
  { path: 'basic-info-audit-list', component: BasicInfoBasicInfoAuditListComponent },
  { path: 'basic-info-statistics', component: BasicInfoBasicInfoStatisticsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicInfoRoutingModule {
}
