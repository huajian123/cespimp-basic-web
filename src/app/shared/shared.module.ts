import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';

// #region third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';
import { DirectivesModule } from '@shared/directives/directives.module';
import { WidgetModule } from '../widget/widget.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { LoginManageHeadComponent } from './businessComp/login-manage-head/login-manage-head.component';
import { G2WaterWaveModule } from '@delon/chart';
const THIRDMODULES = [
  NgZorroAntdModule,
  CountdownModule,
  NgxEchartsModule,
  G2WaterWaveModule
];
// #endregion

// #region your componets & directives
const COMPONENTS = [LoginManageHeadComponent];
const DIRECTIVES = [];
// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,
    // third libs
    ...THIRDMODULES,
    DirectivesModule,
    WidgetModule
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    DirectivesModule,
    WidgetModule
  ]
})
export class SharedModule { }
