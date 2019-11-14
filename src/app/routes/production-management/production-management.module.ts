import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ProductionManagementRoutingModule } from './production-management-routing.module';
import { ProductionListComponent } from './production-list/production-list.component';

const COMPONENTS = [
  ProductionListComponent];
const COMPONENTS_NOROUNT = [];

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
