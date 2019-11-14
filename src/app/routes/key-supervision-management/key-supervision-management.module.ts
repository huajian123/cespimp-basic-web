import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { KeySupervisionManagementRoutingModule } from './key-supervision-management-routing.module';
import { KeySupervisionManagementKeyHazardousChemicalsListComponent } from './key-hazardous-chemicals-list/key-hazardous-chemicals-list.component';
import { KeySupervisionManagementHazardousChemicalProcessesListComponent } from './hazardous-chemical-processes-list/hazardous-chemical-processes-list.component';

const COMPONENTS = [
  KeySupervisionManagementKeyHazardousChemicalsListComponent,
  KeySupervisionManagementHazardousChemicalProcessesListComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    KeySupervisionManagementRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class KeySupervisionManagementModule { }
