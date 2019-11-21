import {NgModule} from '@angular/core';
import {MapPipe} from './pipe/map.pipe';
import {HtmlPipe} from './pipe/html.pipe';
import {DisabledDirective} from './disabled.directive';
import {DebounceClickDirective} from './debounceClick.directive';
import { TrustUrlPipe } from './pipe/trust-url.pipe';

@NgModule({
  exports: [
    MapPipe,
    HtmlPipe,
    DisabledDirective,
    DebounceClickDirective,
    TrustUrlPipe,
  ],
  declarations: [
    MapPipe,
    HtmlPipe,
    DisabledDirective,
    DebounceClickDirective,
    TrustUrlPipe,
  ]
})
export class DirectivesModule {
}
