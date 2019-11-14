import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { WarehouseManagementRoutingModule } from './warehouse-management-routing.module';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';

const COMPONENTS = [
  WarehouseListComponent];
const COMPONENTS_NOROUNT = [];

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
