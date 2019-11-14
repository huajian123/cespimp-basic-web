import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SafetyMapRoutingModule } from './safety-map-routing.module';
import { SafetyMapSafetyMapListComponent } from './safety-map-list/safety-map-list.component';

const COMPONENTS = [
  SafetyMapSafetyMapListComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    SafetyMapRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class SafetyMapModule { }
