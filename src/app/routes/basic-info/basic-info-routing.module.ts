import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicInfoBasicInfoComponent } from './basic-info/basic-info.component';
import { BasicInfoBasicInfoManageComponent } from './basic-info-manage/basic-info-manage.component';

const routes: Routes = [
  // { path: 'basic-info', component: RelationComponent }
  { path: '', redirectTo: 'basic-info-manage', pathMatch: 'full' },
  { path: 'basic-info-manage', component: BasicInfoBasicInfoManageComponent },
  { path: 'basic-info', component: BasicInfoBasicInfoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicInfoRoutingModule {
}
