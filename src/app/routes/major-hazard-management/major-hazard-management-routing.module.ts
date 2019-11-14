import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MajorHazardManagementMajorHazardListComponent } from './major-hazard-list/major-hazard-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'major-hazard-list', pathMatch: 'full' },
  { path: 'major-hazard-list', component: MajorHazardManagementMajorHazardListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MajorHazardManagementRoutingModule { }
