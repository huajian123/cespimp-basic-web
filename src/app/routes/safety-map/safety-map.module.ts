import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SafetyMapRoutingModule } from './safety-map-routing.module';
import { SafetyMapSafetyMapListComponent } from './safety-map-list/safety-map-list.component';
import { SafetyMapEnterpriseComponent } from './safety-map-list/safety-map-enterprise/safety-map-enterprise.component';
import { AlarmListComponent } from './safety-map-list/safety-map-enterprise/alarm-list/alarm-list.component';
import { TempModalComponent } from './safety-map-list/safety-map-enterprise/temp-modal/temp-modal.component';
import { PressModalComponent } from './safety-map-list/safety-map-enterprise/press-modal/press-modal.component';
import { WaterLevelModalComponent } from './safety-map-list/safety-map-enterprise/water-level-modal/water-level-modal.component';

const COMPONENTS = [
  SafetyMapSafetyMapListComponent
];
const COMPONENTS_NOROUNT = [
  AlarmListComponent,
  SafetyMapEnterpriseComponent
];

@NgModule({
  imports: [
    SharedModule,
    SafetyMapRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    TempModalComponent,
    PressModalComponent,
    WaterLevelModalComponent,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class SafetyMapModule {
}
