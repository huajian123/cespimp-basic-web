import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { StorageTankManagementRoutingModule } from './storage-tank-management-routing.module';
import { TankListComponent } from './tank-list/tank-list.component';

const COMPONENTS = [
  TankListComponent];
const COMPONENTS_NOROUNT = [];

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
