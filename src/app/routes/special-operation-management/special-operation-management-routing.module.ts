import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecialOperationManagementHotWorkListComponent } from './hot-work-list/hot-work-list.component';
import { SpecialOperationManagementConfinedSpaceWorkListComponent } from './confined-space-work-list/confined-space-work-list.component';
import { SpecialOperationManagementElevatedWorkListComponent } from './elevated-work-list/elevated-work-list.component';
import { SpecialOperationManagementHoistingOperationListComponent } from './hoisting-operation-list/hoisting-operation-list.component';
import { SpecialOperationManagementTemporaryElectricityListComponent } from './temporary-electricity-list/temporary-electricity-list.component';
import { SpecialOperationManagementEquipmentOverhaulListComponent } from './equipment-overhaul-list/equipment-overhaul-list.component';
import { SpecialOperationManagementBlindPlateListComponent } from './blind-plate-list/blind-plate-list.component';
import { SpecialOperationManagementOpenCircuitListComponent } from './open-circuit-list/open-circuit-list.component';
import { SpecialOperationManagementEarthMovingListComponent } from './earth-moving-list/earth-moving-list.component';
import { SpecialOperationManagementHotWorkEditAddComponent } from './hot-work-list/hot-work-edit-add/hot-work-edit-add.component';
import { SpecialOperationManagementElevatedWorkEditAddComponent } from './elevated-work-list/elevated-work-edit-add/elevated-work-edit-add.component';
import { SpecialOperationManagementHoistingOperationEditAddComponent } from './hoisting-operation-list/hoisting-operation-edit-add/hoisting-operation-edit-add.component';
import { SpecialOperationManagementBlindPlateEditAddComponent } from './blind-plate-list/blind-plate-edit-add/blind-plate-edit-add.component';
import { SpecialOperationManagementEarthMovingEditAddComponent } from './earth-moving-list/earth-moving-edit-add/earth-moving-edit-add.component';
import { SpecialOperationManagementEquipmentOverhaulEditAddComponent } from './equipment-overhaul-list/equipment-overhaul-edit-add/equipment-overhaul-edit-add.component';
import { SpecialOperationManagementOpenCircuitEditAddComponent } from './open-circuit-list/open-circuit-edit-add/open-circuit-edit-add.component';
import { SpecialOperationManagementTemporaryElectricityEditAddComponent } from './temporary-electricity-list/temporary-electricity-edit-add/temporary-electricity-edit-add.component';

const routes: Routes = [

  { path: 'hot-work-list', component: SpecialOperationManagementHotWorkListComponent },
  { path: 'confined-space-work-list', component: SpecialOperationManagementConfinedSpaceWorkListComponent },
  { path: 'elevated-work-list', component: SpecialOperationManagementElevatedWorkListComponent },
  { path: 'hoisting-operation-list', component: SpecialOperationManagementHoistingOperationListComponent },
  { path: 'temporary-electricity-list', component: SpecialOperationManagementTemporaryElectricityListComponent },
  { path: 'equipment-overhaul-list', component: SpecialOperationManagementEquipmentOverhaulListComponent },
  { path: 'blind-plate-list', component: SpecialOperationManagementBlindPlateListComponent },
  { path: 'open-circuit-list', component: SpecialOperationManagementOpenCircuitListComponent },
  { path: 'earth-moving-list', component: SpecialOperationManagementEarthMovingListComponent },
  { path: 'hot-work-edit-add', component: SpecialOperationManagementHotWorkEditAddComponent },
  { path: 'elevated-work-edit-add', component: SpecialOperationManagementElevatedWorkEditAddComponent },
  { path: 'hoisting-operation-edit-add', component: SpecialOperationManagementHoistingOperationEditAddComponent },
  { path: 'blind-plate-edit-add', component: SpecialOperationManagementBlindPlateEditAddComponent },
  { path: 'earth-moving-edit-add', component: SpecialOperationManagementEarthMovingEditAddComponent },
  { path: 'equipment-overhaul-edit-add', component: SpecialOperationManagementEquipmentOverhaulEditAddComponent },
  { path: 'open-circuit-edit-add', component: SpecialOperationManagementOpenCircuitEditAddComponent },
  { path: 'temporary-electricity-edit-add', component: SpecialOperationManagementTemporaryElectricityEditAddComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialOperationManagementRoutingModule { }
