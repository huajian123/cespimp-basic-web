import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MajorHazardManagementMajorHazardListComponent } from './major-hazard-list/major-hazard-list.component';
import { MajorHazardManagementMajorHazardRecordListComponent } from './major-hazard-record-list/major-hazard-record-list.component';
import { MajorHazardManagementMajorHazardStatisticsListComponent } from './major-hazard-statistics-list/major-hazard-statistics-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'major-hazard-list', pathMatch: 'full' },
  { path: 'major-hazard-list', component: MajorHazardManagementMajorHazardListComponent },
  { path: 'major-hazard-record-list', component: MajorHazardManagementMajorHazardRecordListComponent },
  { path: 'major-hazard-statistics-list', component: MajorHazardManagementMajorHazardStatisticsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MajorHazardManagementRoutingModule { }
