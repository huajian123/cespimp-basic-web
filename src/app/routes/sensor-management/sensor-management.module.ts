import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SensorManagementRoutingModule } from './sensor-management-routing.module';
import { SensorManagementSensorListComponent } from './sensor-list/sensor-list.component';
import { SensorManagementSensorRealtimeDataListComponent } from './sensor-realtime-data-list/sensor-realtime-data-list.component';
import { SensorManagementSensorHistoryDataListComponent } from './sensor-history-data-list/sensor-history-data-list.component';

const COMPONENTS = [
  SensorManagementSensorListComponent,
  SensorManagementSensorRealtimeDataListComponent,
  SensorManagementSensorHistoryDataListComponent];
const COMPONENTS_NOROUNT = [];

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
