import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { MajorHazardManagementRoutingModule } from './major-hazard-management-routing.module';
import { MajorHazardManagementMajorHazardListComponent } from './major-hazard-list/major-hazard-list.component';
import { MajorHazardManagementMajorHazardRecordListComponent } from './major-hazard-record-list/major-hazard-record-list.component';
import { MajorHazardManagementMajorHazardStatisticsListComponent } from './major-hazard-statistics-list/major-hazard-statistics-list.component';



const COMPONENTS = [
  MajorHazardManagementMajorHazardListComponent
,
  MajorHazardManagementMajorHazardRecordListComponent,
  MajorHazardManagementMajorHazardStatisticsListComponent];
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
