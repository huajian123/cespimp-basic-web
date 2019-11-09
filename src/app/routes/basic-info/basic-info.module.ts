import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { BasicInfoRoutingModule } from './basic-info-routing.module';
import { BasicInfoManageComponent } from './basic-info-manage/basic-info-manage.component';
import { BasicInfoDetailComponent } from './basic-info-manage/basic-info-detail/basic-info-detail.component';


const COMPONENTS = [
  BasicInfoManageComponent,
  BasicInfoDetailComponent];
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
