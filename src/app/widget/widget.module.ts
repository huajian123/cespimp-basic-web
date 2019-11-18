/**
 * 此模块内的组件仅供此模块内的服务调用，全局注册此模块的内的服务。
 * **/

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule, NZ_MESSAGE_CONFIG} from 'ng-zorro-antd';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';


import {ShowMessageService} from './show-message/show-message';



import {PositionPickerComponent} from './position-picker/position-picker.component';
import {PositionPickerRectComponent} from './position-picker-rect/position-picker-rect.component';
import {ShowPeopleNameComponent} from './show-people-name/show-people-name.component';
import {PositionPickerHistoryTrackComponent} from './position-picker-history-track/position-picker-history-track.component';
import { DirectivesModule } from '@shared/directives/directives.module';


@NgModule({
  imports: [
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DirectivesModule,
  ],
  declarations: [
    PositionPickerComponent,
    PositionPickerRectComponent,
    ShowPeopleNameComponent,
    PositionPickerHistoryTrackComponent],
  providers: [
    ShowMessageService,
    {provide: NZ_MESSAGE_CONFIG, useValue: {nzDuration: 2000}},
  ],
  entryComponents: [
    PositionPickerComponent,
    PositionPickerRectComponent,
    ShowPeopleNameComponent,
    PositionPickerHistoryTrackComponent]
})
export class WidgetModule {
}
