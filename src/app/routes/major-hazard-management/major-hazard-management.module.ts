import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { MajorHazardManagementRoutingModule } from './major-hazard-management-routing.module';



const COMPONENTS = [

];
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
