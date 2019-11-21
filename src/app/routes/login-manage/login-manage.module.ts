import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { LoginManageRoutingModule } from './login-manage-routing.module';
import { LoginPlatformComponent } from './login-platform/login-platform.component';
import { ParkIntroductComponent } from './park-introduct/park-introduct.component';
import { PublicityNoticeListComponent } from './park-introduct/publicity-notice-list/publicity-notice-list.component';
import { PublicityNoticeDetailComponent } from './park-introduct/publicity-notice-list/publicity-notice-detail/publicity-notice-detail.component';

const COMPONENTS = [ParkIntroductComponent];
const COMPONENTS_NOROUNT = [LoginPlatformComponent];

@NgModule({
  imports: [
    SharedModule,
    LoginManageRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    PublicityNoticeListComponent,
    PublicityNoticeDetailComponent,
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class LoginManageModule { }
