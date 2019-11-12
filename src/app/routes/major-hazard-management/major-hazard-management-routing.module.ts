import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MajorHazardManagementTankListComponent } from './tank-list/tank-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'tank-list', pathMatch: 'full' },
  { path: 'tank-list', component: MajorHazardManagementTankListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MajorHazardManagementRoutingModule { }
