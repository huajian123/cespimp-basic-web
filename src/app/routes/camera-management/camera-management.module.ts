import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CameraManagementRoutingModule } from './camera-management-routing.module';
import { CameraManagementCameraListComponent } from './camera-list/camera-list.component';
import { CameraManagementCameraListDetailComponent } from './camera-list/camera-list-detail/camera-list-detail.component';
import { CameraManagementCameraListEditAddComponent } from './camera-list/camera-list-edit-add/camera-list-edit-add.component';

const COMPONENTS = [
  CameraManagementCameraListComponent];
const COMPONENTS_NOROUNT = [
  CameraManagementCameraListDetailComponent,
  CameraManagementCameraListEditAddComponent];

@NgModule({
  imports: [
    SharedModule,
    CameraManagementRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class CameraManagementModule { }
