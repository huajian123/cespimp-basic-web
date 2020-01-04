import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginInfoModel } from '@core/vo/comm/BusinessEnum';
import { PositionPickerService } from '../../../../widget/position-picker/position-picker.service';
import { PositionPickerPolygonService } from '../../../../widget/position-picker-polygon/position-picker-polygon.service';
import { enterpriseInfo } from '@env/environment';
import { EVENT_KEY } from '@env/staticVariable';
import {
  CameraManagementListInfoService,
  CameraManagementListServiceNs,
} from '@core/biz-services/camera-management/camera-list.service';
import MajorHazardUnitList = CameraManagementListServiceNs.MajorHazardUnitList;
import { MapSet } from '@shared/directives/pipe/map.pipe';
import CameraManagementListInfoModel = CameraManagementListServiceNs.CameraManagementListInfoModel;

interface OptionsInterface {
  value: string | number;
  label: string;
}

interface PartNoOptionsInterface extends OptionsInterface {
  partNo: string | number;
}


@Component({
  selector: 'app-camera-management-camera-list-edit-add',
  templateUrl: './camera-list-edit-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CameraManagementCameraListEditAddComponent implements OnInit {
  validateForm: FormGroup;
  @Input() id: number;
  @Input() entprId: number;
  @Input() currentPageNum: number;
  @Output() returnBack: EventEmitter<any>;
  loginInfo: LoginInfoModel;
  majorHazardTypeList: OptionsInterface[];
  majorHazardNameList: OptionsInterface[];
  selMajorNoArray: PartNoOptionsInterface[];
  currentPolygonList: any[];
  dataNameList: any;
  hazardObject: MajorHazardUnitList[];
  dataInfo: CameraManagementListInfoModel;

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              private dataService: CameraManagementListInfoService, private positionPickerService: PositionPickerService,
              private positionPickerPolygonService: PositionPickerPolygonService) {
    this.returnBack = new EventEmitter<any>();
    this.majorHazardNameList = [];
    this.majorHazardTypeList = [];
    this.selMajorNoArray = [];
    this.loginInfo = {
      createBy: '',
      createTime: new Date(),
      delFlag: null,
      entprId: null,
      id: null,
      mobileTel: '',
      password: '',
      realName: '',
      role: null,
      updateBy: '',
      updateTime: new Date(),
      userName: '',
    };
    this.currentPolygonList = [];
    this.hazardObject = [];
  }

  initForm() {
    this.validateForm = this.fb.group({
      cameraNo: [null, [Validators.required]],
      cameraName: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
      locFactory: [null, []],
      majorHazardId: [null, []],
      partId: [null, []],
      partType: [null, []],
      partNo: [null, []],
    });
  }

  async submit() {
    Object.keys(this.validateForm.controls).forEach(key => {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    });
    if (this.validateForm.invalid) {
      return;
    }
    const params = this.validateForm.getRawValue();
    params.entprId = this.loginInfo.entprId;
    let submitHandel = null;
    if (!this.id) {
      params.createBy = this.loginInfo.userName;
      submitHandel = this.dataService.addCamera(params);
    } else {
      params.id = this.id;
      params.updateBy = this.loginInfo.userName;
      submitHandel = this.dataService.editCamera(params);
    }

    await submitHandel;
    this.returnBack.emit({ refesh: true, pageNo: this.currentPageNum });
  }

  async getDetail() {
    this.dataInfo = await this.dataService.getCameraInfoDetail(this.id);
    this.validateForm.get('majorHazardId').setValue(this.dataInfo.majorHazardId);
    setTimeout(() => {
      this.validateForm.get('partType').setValue(this.dataInfo.partType);
      this.validateForm.get('partId').setValue(this.dataInfo.partId);
      this.validateForm.get('partNo').setValue(this.dataInfo.partNo);
    }, 300);

    this.validateForm.patchValue(this.dataInfo);
    this.cdr.markForCheck();
  }


  async changeMajorNameList(event) {
    this.hazardObject = await this.dataService.getMajorHazardTypeList(event);
    //构建重大危险源类型下拉数据
    this.majorHazardTypeList.length = 0;
    this.hazardObject.forEach((item) => {
      const tempObj = { value: item.partType, label: MapSet.partType[item.partType] };
      this.majorHazardTypeList.push(tempObj);
    });
    this.validateForm.get('partType').reset();
    this.validateForm.get('partId').reset();
    this.validateForm.get('partNo').reset();
    this.cdr.markForCheck();
  }

  async getMajorNameList() {
    this.entprId = this.loginInfo.entprId;
    this.dataNameList = await this.dataService.getMajorHazardNameList(this.entprId);
    this.dataNameList.forEach(({ majorHazardId, majorHazardName }) => {
      this.majorHazardNameList.push({ label: majorHazardName, value: majorHazardId });
    });
    this.cdr.markForCheck();
  }

  returnToList() {
    this.returnBack.emit();
  }

  showMap() {
    const isEntprScope = this.dataInfo.entprScope;
    this.positionPickerService.show({
      isRemoteImage: true,
      longitude: enterpriseInfo.longitude,
      latitude: enterpriseInfo.latitude,
      zoom: 18,
      isEntprScope: isEntprScope,
    }).then(res => {
      this.validateForm.get('longitude').setValue(res.longitude);
      this.validateForm.get('latitude').setValue(res.latitude);
    }).catch(e => null);
  }

  // 请选择重大危险源类型
  changeMajorTypeList(e) {
    if (e === null) {
      return;
    }
    try {
      const selMajorNoArray = this.hazardObject.find((item) => {
        return item.partType === e;
      }).partNames;
      this.selMajorNoArray.length = 0;
      selMajorNoArray.forEach((item) => {
        this.selMajorNoArray.push({ value: item.partId, label: item.partName, partNo: item.partNo });
      });
    } catch (e) {

    }

  }

  // 请选择重大危险源组成部分名称
  changeMajorNoList(e) {
    if (e === null) {
      return;
    }
    try {
      const tempSelMajorNo = this.selMajorNoArray.find((item) => {
        return item.value === e;
      });
      this.validateForm.get('partNo').setValue(tempSelMajorNo.partNo);
    } catch (e) {

    }

  }

  ngOnInit(): void {
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.getMajorNameList();
    this.initForm();
    if (this.id) {
      this.getDetail();
    }
  }


}
