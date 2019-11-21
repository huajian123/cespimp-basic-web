import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { MajorHazardManagementRoutingModule } from './major-hazard-management-routing.module';
import { MajorHazardManagementMajorHazardListComponent } from './major-hazard-list/major-hazard-list.component';
import { MajorHazardManagementMajorHazardRecordListComponent } from './major-hazard-record-list/major-hazard-record-list.component';
import { MajorHazardManagementMajorHazardStatisticsListComponent } from './major-hazard-statistics-list/major-hazard-statistics-list.component';
import { MajorHazardManagementMajorHazardEditAddComponent } from './major-hazard-list/major-hazard-edit-add/major-hazard-edit-add.component';
import { MajorHazardManagementMajorHazardDetailComponent } from './major-hazard-list/major-hazard-detail/major-hazard-detail.component';
import { MajorHazardManagementMajorHazardRecordEditAddComponent } from './major-hazard-record-list/major-hazard-record-edit-add/major-hazard-record-edit-add.component';
import { MajorHazardManagementMajorHazardRecordDetailComponent } from './major-hazard-record-list/major-hazard-record-detail/major-hazard-record-detail.component';



const COMPONENTS = [
  MajorHazardManagementMajorHazardListComponent
,
  MajorHazardManagementMajorHazardRecordListComponent,
  MajorHazardManagementMajorHazardStatisticsListComponent];
const COMPONENTS_NOROUNT = [
  MajorHazardManagementMajorHazardEditAddComponent,
  MajorHazardManagementMajorHazardDetailComponent,
  MajorHazardManagementMajorHazardRecordEditAddComponent,
  MajorHazardManagementMajorHazardRecordDetailComponent];

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
