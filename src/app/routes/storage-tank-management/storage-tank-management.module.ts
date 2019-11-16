import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { StorageTankManagementRoutingModule } from './storage-tank-management-routing.module';
import { TankListComponent } from './tank-list/tank-list.component';
import { StorageTankManagementTankListEditAddComponent } from './tank-list-edit-add/tank-list-edit-add.component';
import { StorageTankManagementTankListDetailComponent } from './tank-list-detail/tank-list-detail.component';

const COMPONENTS = [
  TankListComponent];
const COMPONENTS_NOROUNT = [
  StorageTankManagementTankListEditAddComponent,
  StorageTankManagementTankListDetailComponent];

@NgModule({
  imports: [
    SharedModule,
    StorageTankManagementRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class StorageTankManagementModule { }
