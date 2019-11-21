import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { LoginManageRoutingModule } from './login-manage-routing.module';
import { LoginPlatformComponent } from './login-platform/login-platform.component';
import { ParkIntroductComponent } from './park-introduct/park-introduct.component';
import { PublicityNoticeListComponent } from './park-introduct/publicity-notice-list/publicity-notice-list.component';
import { PublicityNoticeDetailComponent } from './park-introduct/publicity-notice-list/publicity-notice-detail/publicity-notice-detail.component';
import { IndustryDynamicsListComponent } from './park-introduct/industry-dynamics-list/industry-dynamics-list.component';
import { IndustryDynamicsDetailComponent } from './park-introduct/industry-dynamics-list/industry-dynamics-detail/industry-dynamics-detail.component';
import { DocumentNotificationListComponent } from './park-introduct/document-notification-list/document-notification-list.component';

const COMPONENTS = [
  ParkIntroductComponent,
  PublicityNoticeListComponent,
  PublicityNoticeDetailComponent,
  IndustryDynamicsListComponent,
  IndustryDynamicsDetailComponent,
  DocumentNotificationListComponent,
];
const COMPONENTS_NOROUNT = [LoginPlatformComponent];

@NgModule({
  imports: [
    SharedModule,
    LoginManageRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class LoginManageModule {
}
