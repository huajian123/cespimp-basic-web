import {Injectable, Injector} from '@angular/core';
import {BaseConfirmModal} from '../base-confirm-modal';
import {ShowPeopleNameComponent} from './show-people-name.component';

@Injectable({
  providedIn: 'root'
})
export class ShowPeopleNameService extends BaseConfirmModal.BaseConfirmModalService {

  constructor(private injector: Injector) {
    super(injector);
  }

  protected getContentComponent(): any {
    return ShowPeopleNameComponent;
  }

  public show(params: any = {}) {
    return super.show({nzTitle: '人员列表', nzFooter: null}, params);
  }
}
