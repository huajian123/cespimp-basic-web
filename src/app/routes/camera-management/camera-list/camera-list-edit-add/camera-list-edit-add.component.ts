import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { FormGroup } from '@angular/forms';
import { LoginInfoModel } from '@core/vo/comm/BusinessEnum';

interface OptionsInterface {
  value: string | number;
  label: string;
  partType?: number;
}

@Component({
  selector: 'app-camera-management-camera-list-edit-add',
  templateUrl: './camera-list-edit-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CameraManagementCameraListEditAddComponent implements OnInit {
  validateForm: FormGroup;
  @Input() id: number;
  @Input() currentPageNum: number;
  @Output() returnBack: EventEmitter<any>;
  loginInfo: LoginInfoModel;
  unitTypeOptions: OptionsInterface[];
  sensorTypeOptions: OptionsInterface[];
  HazardNatureOptions: OptionsInterface[];
  majorList: OptionsInterface[];
  selMajorNoArray: OptionsInterface[];
  currentPolygonList: any[];
  showTrue: boolean;

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {
  }

  ngOnInit(): void {

  }



}
