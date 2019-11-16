import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ProductionManagementRoutingModule } from './production-management-routing.module';
import { ProductionListComponent } from './production-list/production-list.component';
import { ProductionManagementProductionListDetailComponent } from './production-list-detail/production-list-detail.component';
import { ProductionManagementProductionListEditAddComponent } from './production-list-edit-add/production-list-edit-add.component';

const COMPONENTS = [
  ProductionListComponent];
const COMPONENTS_NOROUNT = [
  ProductionManagementProductionListDetailComponent,
  ProductionManagementProductionListEditAddComponent];

@NgModule({
  imports: [
    SharedModule,
    ProductionManagementRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ProductionManagementModule { }
