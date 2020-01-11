import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SafetyMapRoutingModule } from './safety-map-routing.module';
import { SafetyMapSafetyMapListComponent } from './safety-map-list/safety-map-list.component';
import { SafetyMapEnterpriseComponent } from './safety-map-list/safety-map-enterprise/safety-map-enterprise.component';
import { AlarmListComponent } from './safety-map-list/safety-map-enterprise/alarm-list/alarm-list.component';
import { TempModalComponent } from './safety-map-list/safety-map-enterprise/temp-modal/temp-modal.component';
import { PressModalComponent } from './safety-map-list/safety-map-enterprise/press-modal/press-modal.component';
import { WaterLevelModalComponent } from './safety-map-list/safety-map-enterprise/water-level-modal/water-level-modal.component';
import { ToxicGasModalComponent } from './safety-map-list/safety-map-enterprise/toxic-gas-modal/toxic-gas-modal.component';
import { CameraListModalComponent } from './safety-map-list/safety-map-enterprise/camera-list-modal/camera-list-modal.component';
import { CombustibleGasModalComponent } from './safety-map-list/safety-map-enterprise/combustible-gas-modal/combustible-gas-modal.component';
import { MajorHazardSourcesComponent } from './safety-map-list/safety-map-enterprise/major-hazard-sources/major-hazard-sources.component';


const COMPONENTS = [
  SafetyMapSafetyMapListComponent,
  WaterLevelModalComponent,
  TempModalComponent,
  PressModalComponent,
  ToxicGasModalComponent,
  CombustibleGasModalComponent,
  CameraListModalComponent,
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
    MajorHazardSourcesComponent,
  ],
  entryComponents: COMPONENTS_NOROUNT,
  exports: [
    CameraListModalComponent,
  ],
})
export class SafetyMapModule {
}
