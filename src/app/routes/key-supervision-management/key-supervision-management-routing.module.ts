import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KeySupervisionManagementKeyHazardousChemicalsListComponent } from './key-hazardous-chemicals-list/key-hazardous-chemicals-list.component';
import { KeySupervisionManagementHazardousChemicalProcessesListComponent } from './hazardous-chemical-processes-list/hazardous-chemical-processes-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'key-hazardous-chemicals-list', pathMatch: 'full' },
  { path: 'key-hazardous-chemicals-list', component: KeySupervisionManagementKeyHazardousChemicalsListComponent },
  { path: 'hazardous-chemical-processes-list', component: KeySupervisionManagementHazardousChemicalProcessesListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeySupervisionManagementRoutingModule { }
