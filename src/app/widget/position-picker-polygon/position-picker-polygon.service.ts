import {Injectable, Injector} from '@angular/core';
import {BaseConfirmModal} from '../base-confirm-modal';
import { PositionPickerPolygonComponent } from './position-picker-polygon.component';

@Injectable({
  providedIn: 'root'
})
export class PositionPickerPolygonService extends BaseConfirmModal.BaseConfirmModalService {

  constructor(private injector: Injector) {
    super(injector);
  }

  protected getContentComponent(): any {
    return PositionPickerPolygonComponent;
  }

  public show(params: any = {}) {
    const modalOptons = {
      nzTitle: '位置选择',
      nzFooter: null,
    };
    return super.show(modalOptons, params);
  }
}
