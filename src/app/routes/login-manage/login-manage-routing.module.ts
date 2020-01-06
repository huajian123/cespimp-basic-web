import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KeySupervisionManagementKeyHazardousChemicalsListComponent } from '../key-supervision-management/key-hazardous-chemicals-list/key-hazardous-chemicals-list.component';
import { LoginPlatformComponent } from './login-platform/login-platform.component';
import { ParkIntroductComponent } from './park-introduct/park-introduct.component';
import { ParkIntroductManageComponent } from './park-introduct/park-introduct-manage/park-introduct-manage.component';

const routes: Routes = [
  { path: '', redirectTo: 'login-plant', pathMatch: 'full' },
  { path: 'login-plant', component: LoginPlatformComponent },
  { path: 'park-introduction', component: ParkIntroductComponent },
  { path: 'park-introduction-manage', component: ParkIntroductManageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginManageRoutingModule { }
