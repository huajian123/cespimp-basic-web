import { Injector, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService, OnClickCallback } from 'ng-zorro-antd';

export namespace BaseConfirmModal {

  export enum ModalBtnStatus {
    Cancel,
    Ok
  }

  export interface ModalData<T> {
    status: number | string;
    value: T;
  }

  export interface ModalValue<T> {
    modalRef: NzModalRef;
    value?: T;
  }

  export interface ModalOptions {
    nzVisible?: boolean;
    nzWidth?: number | string;
    nzClassName?: string;
    nzStyle?: object;
    nzTitle?: string | TemplateRef<{}>;
    nzClosable?: boolean;
    nzMask?: boolean;
    nzMaskClosable?: boolean;
    nzMaskStyle?: object;
    nzBodyStyle?: object;
    nzOkText?: string;
    nzCancelText?: string;
    nzFooter?: any[];
    nzOnOk?: OnClickCallback<any>;
    nzOnCancel?: OnClickCallback<any>;
  }

  export abstract class BasicConfirmModalComponent<T> {
    protected params: any; // service传给component instance的参数
    constructor() {}

    protected abstract getCurrentValue(): any;

    protected checkValueValid(): Promise<boolean> {
      return Promise.resolve(true);
    }
  }

  export abstract class BaseConfirmModalService {
    protected modalRef: NzModalRef = null;

    protected bsModalService: NzModalService;

    constructor(private baseInjector: Injector) {
      this.bsModalService = this.baseInjector.get(NzModalService);
    }

    public show<T = any>(modalOptions: ModalOptions = {}, params: object = {}): Promise<any> {
      this.modalRef = this.bsModalService.create(Object.assign({
        nzTitle: '',
        nzContent: this.getContentComponent(),
        nzMaskClosable: false,
        nzFooter: [ {
          label: '确认',
          type: 'primary',
          show: true,
          onClick: (this.confirmCallback).bind(this)
        }, {
          label: '取消',
          type: 'default',
          show: true,
          onClick: (this.cancelCallback).bind(this)
        } ],
        nzClosable: true,
        nzWidth: 720,
        nzComponentParams: {
          params: params
        }, // 参数中的属性将传入nzContent实例中
      }, modalOptions));
      return new Promise<any>((resolve, reject) => {
        this.modalRef.afterClose.subscribe((result: any) => {
          console.log(result);
          if (!result) {
            reject();
          } else {
            resolve(result.value);
          }
        });
      });
    }

    protected abstract getContentComponent(): any;

    protected cancelCallback(contentComponentInstance?: object) {
      this.modalRef.destroy(null);
    }

    protected confirmCallback(contentComponentInstance?: object) {
      (<any>contentComponentInstance).checkValueValid().then((isValid) => {
        if (!isValid) {
          return;
        }
        this.modalRef.destroy({ status: ModalBtnStatus.Ok, value: (<any>contentComponentInstance).getCurrentValue() });
      });
    }

  }
}
