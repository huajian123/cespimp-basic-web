import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { MajorHazardManagementRoutingModule } from './major-hazard-management-routing.module';
import { MajorHazardManagementTankListComponent } from './tank-list/tank-list.component';
import { MajorHazardManagementWarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { MajorHazardManagementProductionListComponent } from './production-list/production-list.component';
import { MajorHazardManagementMajorHazardListComponent } from './major-hazard-list/major-hazard-list.component';


const COMPONENTS = [
  MajorHazardManagementTankListComponent,
  MajorHazardManagementWarehouseListComponent,
  MajorHazardManagementProductionListComponent,
  /*MajorHazardManagementMajorHazardListComponent*/];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    MajorHazardManagementRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class MajorHazardManagementModule { }
