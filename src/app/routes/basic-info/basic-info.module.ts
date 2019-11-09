import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { BasicInfoRoutingModule } from './basic-info-routing.module';
import { BasicInfoBasicInfoComponent } from './basic-info/basic-info.component';
import { BasicInfoBasicInfoManageComponent } from './basic-info-manage/basic-info-manage.component';


const COMPONENTS = [
  BasicInfoBasicInfoComponent,
  BasicInfoBasicInfoManageComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    BasicInfoRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class BasicInfoModule { }
