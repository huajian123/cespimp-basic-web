import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SensorManagementRoutingModule } from './sensor-management-routing.module';
import { SensorManagementSensorListComponent } from './sensor-list/sensor-list.component';
import { SensorManagementSensorRealtimeDataListComponent } from './sensor-realtime-data-list/sensor-realtime-data-list.component';
import { SensorManagementSensorHistoryDataListComponent } from './sensor-history-data-list/sensor-history-data-list.component';
import { SensorManagementSensorListEditAddComponent } from './sensor-list/sensor-list-edit-add/sensor-list-edit-add.component';
import { SensorManagementSensorListDetailComponent } from './sensor-list/sensor-list-detail/sensor-list-detail.component';
import { SensorManagementSensorHistoryDataListDetailComponent } from './sensor-history-data-list/sensor-history-data-list-detail/sensor-history-data-list-detail.component';
import { SensorManagementSensorHistoryDataListEditAddComponent } from './sensor-history-data-list/sensor-history-data-list-edit-add/sensor-history-data-list-edit-add.component';
import { SensorManagementSensorRealtimeDataListEditAddComponent } from './sensor-realtime-data-list/sensor-realtime-data-list-edit-add/sensor-realtime-data-list-edit-add.component';
import { SensorManagementSensorRealtimeDataListDetailComponent } from './sensor-realtime-data-list/sensor-realtime-data-list-detail/sensor-realtime-data-list-detail.component';

const COMPONENTS = [
  SensorManagementSensorListComponent,
  SensorManagementSensorRealtimeDataListComponent,
  SensorManagementSensorHistoryDataListComponent];
const COMPONENTS_NOROUNT = [
  SensorManagementSensorListEditAddComponent,
  SensorManagementSensorListEditAddComponent,
  SensorManagementSensorListDetailComponent,
  SensorManagementSensorHistoryDataListDetailComponent,
  SensorManagementSensorHistoryDataListEditAddComponent,
  SensorManagementSensorRealtimeDataListEditAddComponent,
  SensorManagementSensorRealtimeDataListDetailComponent];

@NgModule({
  imports: [
    SharedModule,
    SensorManagementRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class SensorManagementModule { }
