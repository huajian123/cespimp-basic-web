import { EventEmitter, Injectable } from '@angular/core';
import { ModalOptionsForService, NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export enum MessageType {
  Info = 'info',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
  Confirm = 'confirm',
  Loading = 'loading'
}

export enum MessageCallback {
  Cancel = 'onCancel',
  Ok = 'onOk'
}

@Injectable({
  providedIn: 'root'
})
export class ShowMessageService {
  modalCtrl: NzModalRef[];
  loadEvent: EventEmitter<{ loading: boolean; message?: string }>;
  private loading: boolean;

  constructor(
    private nzModalService: NzModalService,
    private router: Router,
    private toastService: NzMessageService
  ) {
    this.modalCtrl = [];
    this.loadEvent = new EventEmitter();

    (this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)) as Observable<any>).subscribe((event: any) => {
      for (let i = 0, len = this.modalCtrl.length; i < len; i++) {
        this.modalCtrl[i].destroy(MessageCallback.Cancel);
      }
      this.modalCtrl = [];
    });
    this.loading = false;
  }

  /**
   * 显示不同类型的弹框
   * @param title
   * @param message
   * @param type
   */
  public showAlertMessage(title: string, message: string, type: MessageType = MessageType.Info): NzModalRef {
    let modalRef: NzModalRef = null;
    const options: ModalOptionsForService = {
      nzTitle: title,
      nzContent: message,
      nzOnOk: () => {
        modalRef.destroy(MessageCallback.Ok);
      },
      nzOnCancel: () => {
        modalRef.destroy(MessageCallback.Cancel);
      }
    };
    if (type === MessageType.Info) {
      options.nzTitle = options.nzTitle || '信息提示';
      modalRef = this.nzModalService.info(options);
    } else if (type === MessageType.Success) {
      options.nzTitle = options.nzTitle || '成功提示';
      modalRef = this.nzModalService.success(options);
    } else if (type === MessageType.Error) {
      options.nzTitle = options.nzTitle || '失败提示';
      modalRef = this.nzModalService.error(options);
    } else if (type === MessageType.Warning) {
      options.nzTitle = options.nzTitle || '警告提示';
      modalRef = this.nzModalService.warning(options);
    } else if (type === MessageType.Confirm) {
      options.nzTitle = options.nzTitle || '确认提示';
      modalRef = this.nzModalService.confirm(options);
    } else {
      return null;
    }
    this.modalCtrl.push(modalRef);
    modalRef.afterClose.subscribe(() => {
      for (let i = 0, len = this.modalCtrl.length; i < len; i++) {
        if (this.modalCtrl[i] === modalRef) {
          this.modalCtrl.splice(i, 1);
          break;
        }
      }
    });
    return modalRef;
  }

  /**
   * 显示全局loading
   * **/
  public showLoading(message?: string) {
    this.loading = true;
    this.loadEvent.emit({
      loading: this.loading,
      message
    });
  }

  /**
   * 关闭全局loading
   */
  public closeLoading() {
    this.loading = false;
    this.loadEvent.emit({
      loading: this.loading,
    });
  }

  /**
   * loading是否正显示
   */
  public loadingIsShow(): boolean {
    return this.loading;
  }

  /**
   * 显示消息
   * @param message
   * @param type
   * @param duration
   */
  public showToastMessage(message: string, type: MessageType = MessageType.Info, duration: number = 2000): Function {
    const nzMessage = this.toastService.create(type, message, { nzDuration: duration });
    return () => {
      this.toastService.remove(nzMessage.messageId);
    };
  }
}
