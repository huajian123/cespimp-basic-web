import {Injectable, Injector} from '@angular/core';
import {BaseConfirmModal} from '../base-confirm-modal';
import {PositionPickerRectComponent} from './position-picker-rect.component';

@Injectable({
  providedIn: 'root'
})
export class PositionPickerRectService extends BaseConfirmModal.BaseConfirmModalService {

  constructor(private injector: Injector) {
    super(injector);
  }

  protected getContentComponent(): any {
    return PositionPickerRectComponent;
  }

  private confirmCallback_child(contentComponentInstance?: any) {
    console.log(contentComponentInstance);
    return <any>contentComponentInstance.clean();
  }


  public show(params: any = {}) {
    const modalOptons = {
      nzTitle: '位置选择',
      nzFooter: [{
        label: '确认',
        type: 'primary',
        show: true,
        onClick: (this.confirmCallback).bind(this)
      }],
    };


    if (params === null || params.canEdit) {
      modalOptons.nzFooter.push({
        label: '清空',
        type: 'primary',
        show: true,
        onClick: this.confirmCallback_child.bind(this)
      });
    }
    return super.show(modalOptons, params);
  }
}
