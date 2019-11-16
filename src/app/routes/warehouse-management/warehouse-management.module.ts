import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { WarehouseManagementRoutingModule } from './warehouse-management-routing.module';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { WarehouseManagementWarehouseListEditAddComponent } from './warehouse-list-edit-add/warehouse-list-edit-add.component';
import { WarehouseManagementWarehouseListDetailComponent } from './warehouse-list-detail/warehouse-list-detail.component';

const COMPONENTS = [
  WarehouseListComponent,];
const COMPONENTS_NOROUNT = [
  WarehouseManagementWarehouseListEditAddComponent,
  WarehouseManagementWarehouseListDetailComponent,
  ];

@NgModule({
  imports: [
    SharedModule,
    WarehouseManagementRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class WarehouseManagementModule { }
