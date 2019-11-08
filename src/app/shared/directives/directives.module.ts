import {NgModule} from '@angular/core';
import {MapPipe} from './pipe/map.pipe';
import {HtmlPipe} from './pipe/html.pipe';
import {DisabledDirective} from './disabled.directive';
import {ContextPipe} from './pipe/context.pipe';
import {DebounceClickDirective} from './debounceClick.directive';
import { TrustUrlPipe } from './pipe/trust-url.pipe';
import {SetUeditorDirective} from './set-ueditor.directive';

@NgModule({
  exports: [
    MapPipe,
    HtmlPipe,
    DisabledDirective,
    DebounceClickDirective,
    ContextPipe,
    TrustUrlPipe,
    SetUeditorDirective
  ],
  declarations: [
    MapPipe,
    HtmlPipe,
    DisabledDirective,
    DebounceClickDirective,
    ContextPipe,
    TrustUrlPipe,
    SetUeditorDirective
  ]
})
export class DirectivesModule {
}
