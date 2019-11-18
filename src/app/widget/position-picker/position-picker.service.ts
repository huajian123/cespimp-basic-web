import {Injectable, Injector} from '@angular/core';
import {BaseConfirmModal} from '../base-confirm-modal';
import {PositionPickerComponent} from './position-picker.component';

@Injectable({
  providedIn: 'root'
})
export class PositionPickerService extends BaseConfirmModal.BaseConfirmModalService {

  constructor(private injector: Injector) {
    super(injector);
  }

  protected getContentComponent(): any {
    return PositionPickerComponent;
  }

  public show(params: any = {}) {
    return super.show({nzTitle: '位置选择'}, params);
  }
}
