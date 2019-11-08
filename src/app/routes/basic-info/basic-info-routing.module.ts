import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicInfoBasicInfoComponent } from './basic-info/basic-info.component';

const routes: Routes = [
  // { path: 'basic-info', component: RelationComponent }
  {path: '', redirectTo: 'basic-info', pathMatch: 'full'},
  { path: 'basic-info', component: BasicInfoBasicInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicInfoRoutingModule { }
