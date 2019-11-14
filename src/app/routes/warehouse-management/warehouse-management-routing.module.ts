import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'warehouse-list', pathMatch: 'full' },
  { path: 'warehouse-list', component: WarehouseListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseManagementRoutingModule { }
