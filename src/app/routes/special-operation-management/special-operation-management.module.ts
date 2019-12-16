import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SpecialOperationManagementRoutingModule } from './special-operation-management-routing.module';
import { SpecialOperationManagementHotWorkListComponent } from './hot-work-list/hot-work-list.component';
import { SpecialOperationManagementConfinedSpaceWorkListComponent } from './confined-space-work-list/confined-space-work-list.component';
import { SpecialOperationManagementElevatedWorkListComponent } from './elevated-work-list/elevated-work-list.component';
import { SpecialOperationManagementHoistingOperationListComponent } from './hoisting-operation-list/hoisting-operation-list.component';
import { SpecialOperationManagementTemporaryElectricityListComponent } from './temporary-electricity-list/temporary-electricity-list.component';
import { SpecialOperationManagementEquipmentOverhaulListComponent } from './equipment-overhaul-list/equipment-overhaul-list.component';
import { SpecialOperationManagementBlindPlateListComponent } from './blind-plate-list/blind-plate-list.component';
import { SpecialOperationManagementOpenCircuitListComponent } from './open-circuit-list/open-circuit-list.component';
import { SpecialOperationManagementEarthMovingListComponent } from './earth-moving-list/earth-moving-list.component';
import { SpecialOperationManagementConfinedSpaceWorkDetailComponent } from './confined-space-work-list/confined-space-work-detail/confined-space-work-detail.component';
import { SpecialOperationManagementConfinedSpaceWorkEditAddComponent } from './confined-space-work-list/confined-space-work-edit-add/confined-space-work-edit-add.component';

const COMPONENTS = [
  SpecialOperationManagementHotWorkListComponent,
  SpecialOperationManagementConfinedSpaceWorkListComponent,
  SpecialOperationManagementElevatedWorkListComponent,
  SpecialOperationManagementHoistingOperationListComponent,
  SpecialOperationManagementTemporaryElectricityListComponent,
  SpecialOperationManagementEquipmentOverhaulListComponent,
  SpecialOperationManagementBlindPlateListComponent,
  SpecialOperationManagementOpenCircuitListComponent,
  SpecialOperationManagementEarthMovingListComponent];
const COMPONENTS_NOROUNT = [
  SpecialOperationManagementConfinedSpaceWorkDetailComponent,
  SpecialOperationManagementConfinedSpaceWorkEditAddComponent];

@NgModule({
  imports: [
    SharedModule,
    SpecialOperationManagementRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class SpecialOperationManagementModule { }
