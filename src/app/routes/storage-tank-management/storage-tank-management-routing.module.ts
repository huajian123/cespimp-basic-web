import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TankListComponent } from './tank-list/tank-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'tank-list', pathMatch: 'full' },
  { path: 'tank-list', component: TankListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorageTankManagementRoutingModule { }
