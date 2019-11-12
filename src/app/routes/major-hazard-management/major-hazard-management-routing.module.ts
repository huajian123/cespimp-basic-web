import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MajorHazardManagementTankListComponent } from './tank-list/tank-list.component';
import { MajorHazardManagementWarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { MajorHazardManagementProductionListComponent } from './production-list/production-list.component';
import { MajorHazardManagementMajorHazardListComponent } from './major-hazard-list/major-hazard-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'tank-list', pathMatch: 'full' },
  { path: 'tank-list', component: MajorHazardManagementTankListComponent },
  { path: 'warehouse-list', component: MajorHazardManagementWarehouseListComponent },
  { path: 'production-list', component: MajorHazardManagementProductionListComponent },
  { path: 'major-hazard-list', component: MajorHazardManagementMajorHazardListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MajorHazardManagementRoutingModule { }
