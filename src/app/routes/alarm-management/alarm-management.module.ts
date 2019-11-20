import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AlarmManagementRoutingModule } from './alarm-management-routing.module';
import { AlarmManagementRealtimeAlarmListComponent } from './realtime-alarm-list/realtime-alarm-list.component';
import { AlarmManagementHistoricalAlarmListComponent } from './historical-alarm-list/historical-alarm-list.component';

const COMPONENTS = [
  AlarmManagementRealtimeAlarmListComponent,
  AlarmManagementHistoricalAlarmListComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    AlarmManagementRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class AlarmManagementModule { }
