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
import { SpecialOperationManagementHotWorkEditAddComponent } from './hot-work-list/hot-work-edit-add/hot-work-edit-add.component';
import { SpecialOperationManagementHotWorkDetailComponent } from './hot-work-list/hot-work-detail/hot-work-detail.component';
import { SpecialOperationManagementElevatedWorkEditAddComponent } from './elevated-work-list/elevated-work-edit-add/elevated-work-edit-add.component';
import { SpecialOperationManagementElevatedWorkDetailComponent } from './elevated-work-list/elevated-work-detail/elevated-work-detail.component';
import { SpecialOperationManagementHoistingOperationEditAddComponent } from './hoisting-operation-list/hoisting-operation-edit-add/hoisting-operation-edit-add.component';
import { SpecialOperationManagementHoistingOperationDetailComponent } from './hoisting-operation-list/hoisting-operation-detail/hoisting-operation-detail.component';
import { SpecialOperationManagementBlindPlateEditAddComponent } from './blind-plate-list/blind-plate-edit-add/blind-plate-edit-add.component';
import { SpecialOperationManagementBlindPlateDetailComponent } from './blind-plate-list/blind-plate-detail/blind-plate-detail.component';
import { SpecialOperationManagementEarthMovingEditAddComponent } from './earth-moving-list/earth-moving-edit-add/earth-moving-edit-add.component';
import { SpecialOperationManagementEarthMovingDetailComponent } from './earth-moving-list/earth-moving-detail/earth-moving-detail.component';
import { SpecialOperationManagementEquipmentOverhaulEditAddComponent } from './equipment-overhaul-list/equipment-overhaul-edit-add/equipment-overhaul-edit-add.component';
import { SpecialOperationManagementEquipmentOverhaulDetailComponent } from './equipment-overhaul-list/equipment-overhaul-detail/equipment-overhaul-detail.component';
import { SpecialOperationManagementOpenCircuitEditAddComponent } from './open-circuit-list/open-circuit-edit-add/open-circuit-edit-add.component';
import { SpecialOperationManagementOpenCircuitDetailComponent } from './open-circuit-list/open-circuit-detail/open-circuit-detail.component';
import { SpecialOperationManagementTemporaryElectricityEditAddComponent } from './temporary-electricity-list/temporary-electricity-edit-add/temporary-electricity-edit-add.component';
import { SpecialOperationManagementTemporaryElectricityDetailComponent } from './temporary-electricity-list/temporary-electricity-detail/temporary-electricity-detail.component';

const COMPONENTS = [
  SpecialOperationManagementHotWorkListComponent,
  SpecialOperationManagementConfinedSpaceWorkListComponent,
  SpecialOperationManagementElevatedWorkListComponent,
  SpecialOperationManagementHoistingOperationListComponent,
  SpecialOperationManagementTemporaryElectricityListComponent,
  SpecialOperationManagementEquipmentOverhaulListComponent,
  SpecialOperationManagementBlindPlateListComponent,
  SpecialOperationManagementOpenCircuitListComponent,
  SpecialOperationManagementEarthMovingListComponent,
  SpecialOperationManagementHotWorkEditAddComponent,
  SpecialOperationManagementElevatedWorkEditAddComponent,
  SpecialOperationManagementHoistingOperationEditAddComponent,
  SpecialOperationManagementBlindPlateEditAddComponent,
  SpecialOperationManagementEarthMovingEditAddComponent,
  SpecialOperationManagementEquipmentOverhaulEditAddComponent,
  SpecialOperationManagementOpenCircuitEditAddComponent,
  SpecialOperationManagementTemporaryElectricityEditAddComponent];
const COMPONENTS_NOROUNT = [
  SpecialOperationManagementConfinedSpaceWorkDetailComponent,
  SpecialOperationManagementConfinedSpaceWorkEditAddComponent,
  SpecialOperationManagementHotWorkDetailComponent,
  SpecialOperationManagementElevatedWorkDetailComponent,
  SpecialOperationManagementHoistingOperationDetailComponent,
  SpecialOperationManagementBlindPlateDetailComponent,
  SpecialOperationManagementEarthMovingDetailComponent,
  SpecialOperationManagementEquipmentOverhaulDetailComponent,
  SpecialOperationManagementOpenCircuitDetailComponent,
  SpecialOperationManagementTemporaryElectricityDetailComponent];

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
