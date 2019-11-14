import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductionListComponent } from './production-list/production-list.component';

const routes: Routes = [

  { path: 'production-list', component: ProductionListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionManagementRoutingModule { }
