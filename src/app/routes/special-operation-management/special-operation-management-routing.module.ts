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

const routes: Routes = [

  { path: 'hot-work-list', component: SpecialOperationManagementHotWorkListComponent },
  { path: 'confined-space-work-list', component: SpecialOperationManagementConfinedSpaceWorkListComponent },
  { path: 'elevated-work-list', component: SpecialOperationManagementElevatedWorkListComponent },
  { path: 'hoisting-operation-list', component: SpecialOperationManagementHoistingOperationListComponent },
  { path: 'temporary-electricity-list', component: SpecialOperationManagementTemporaryElectricityListComponent },
  { path: 'equipment-overhaul-list', component: SpecialOperationManagementEquipmentOverhaulListComponent },
  { path: 'blind-plate-list', component: SpecialOperationManagementBlindPlateListComponent },
  { path: 'open-circuit-list', component: SpecialOperationManagementOpenCircuitListComponent },
  { path: 'earth-moving-list', component: SpecialOperationManagementEarthMovingListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialOperationManagementRoutingModule { }
