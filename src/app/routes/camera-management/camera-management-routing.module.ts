import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CameraManagementCameraListComponent } from './camera-list/camera-list.component';

const routes: Routes = [

  { path: 'camera-list', component: CameraManagementCameraListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CameraManagementRoutingModule { }
