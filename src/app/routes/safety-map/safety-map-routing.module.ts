import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SafetyMapSafetyMapListComponent } from './safety-map-list/safety-map-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'safety-map-list', pathMatch: 'full' },
  { path: 'safety-map-list', component: SafetyMapSafetyMapListComponent },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SafetyMapRoutingModule { }
