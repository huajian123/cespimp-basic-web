import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { KeySupervisionManagementRoutingModule } from './key-supervision-management-routing.module';
import { KeySupervisionManagementKeyHazardousChemicalsListComponent } from './key-hazardous-chemicals-list/key-hazardous-chemicals-list.component';
import { KeySupervisionManagementHazardousChemicalProcessesListComponent } from './hazardous-chemical-processes-list/hazardous-chemical-processes-list.component';
import { KeySupervisionManagementKeyHazardousChemicalsDetailComponent } from './key-hazardous-chemicals-list/key-hazardous-chemicals-detail/key-hazardous-chemicals-detail.component';
import { KeySupervisionManagementKeyHazardousChemicalsEditAddComponent } from './key-hazardous-chemicals-list/key-hazardous-chemicals-edit-add/key-hazardous-chemicals-edit-add.component';
import { KeySupervisionManagementHazardousChemicalProcessesDetailComponent } from './hazardous-chemical-processes-list/hazardous-chemical-processes-detail/hazardous-chemical-processes-detail.component';
import { KeySupervisionManagementHazardousChemicalProcessesEditAddComponent } from './hazardous-chemical-processes-list/hazardous-chemical-processes-edit-add/hazardous-chemical-processes-edit-add.component';



const COMPONENTS = [
  KeySupervisionManagementKeyHazardousChemicalsListComponent,
  KeySupervisionManagementHazardousChemicalProcessesListComponent];
const COMPONENTS_NOROUNT = [
  KeySupervisionManagementKeyHazardousChemicalsDetailComponent,
  KeySupervisionManagementKeyHazardousChemicalsEditAddComponent,
  KeySupervisionManagementHazardousChemicalProcessesDetailComponent,
  KeySupervisionManagementHazardousChemicalProcessesEditAddComponent];

@NgModule({
  imports: [
    SharedModule,
    KeySupervisionManagementRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class KeySupervisionManagementModule {
}
