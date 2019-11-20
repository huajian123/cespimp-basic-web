import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CameraManagementRoutingModule } from './camera-management-routing.module';
import { CameraManagementCameraListComponent } from './camera-list/camera-list.component';

const COMPONENTS = [
  CameraManagementCameraListComponent];
const COMPONENTS_NOROUNT = [];

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
