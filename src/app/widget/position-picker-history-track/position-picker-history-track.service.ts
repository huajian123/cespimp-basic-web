import {Injectable, Injector} from '@angular/core';
import {BaseConfirmModal} from '../base-confirm-modal';
import {PositionPickerHistoryTrackComponent} from './position-picker-history-track.component';

@Injectable({
  providedIn: 'root'
})
export class PositionPickerHistoryTrackService extends BaseConfirmModal.BaseConfirmModalService {

  constructor(private injector: Injector) {
    super(injector);
  }

  protected getContentComponent(): any {
    return PositionPickerHistoryTrackComponent;
  }

  public show(params: any = {}) {
    return super.show({nzTitle: '轨迹', nzFooter: null}, params);
  }
}
