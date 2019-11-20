import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlarmManagementRealtimeAlarmListComponent } from './realtime-alarm-list/realtime-alarm-list.component';
import { AlarmManagementHistoricalAlarmListComponent } from './historical-alarm-list/historical-alarm-list.component';

const routes: Routes = [

  { path: 'realtime-alarm-list', component: AlarmManagementRealtimeAlarmListComponent },
  { path: 'historical-alarm-list', component: AlarmManagementHistoricalAlarmListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlarmManagementRoutingModule { }
