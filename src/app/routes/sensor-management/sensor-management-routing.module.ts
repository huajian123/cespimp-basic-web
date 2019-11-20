import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SensorManagementSensorListComponent } from './sensor-list/sensor-list.component';
import { SensorManagementSensorRealtimeDataListComponent } from './sensor-realtime-data-list/sensor-realtime-data-list.component';
import { SensorManagementSensorHistoryDataListComponent } from './sensor-history-data-list/sensor-history-data-list.component';

const routes: Routes = [

  { path: 'sensor-list', component: SensorManagementSensorListComponent },
  { path: 'sensor-realtime-data-list', component: SensorManagementSensorRealtimeDataListComponent },
  { path: 'sensor-history-data-list', component: SensorManagementSensorHistoryDataListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SensorManagementRoutingModule { }
