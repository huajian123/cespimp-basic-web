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
import { CameraManagementListInfoService } from '@core/biz-services/camera-management/camera-list.service';

interface OptionsInterface {
  value: string | number;
  label: string;
  partType?: number;
}

interface MajorHazardPartModel {
  partType: number;
  partNo: string;
  partName: string;
  partId: number;
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
  unitTypeOptions: OptionsInterface[];
  sensorTypeOptions: OptionsInterface[];
  HazardNatureOptions: OptionsInterface[];
  majorList: OptionsInterface[];
  majorAllNo: MajorHazardPartModel[];
  selMajorNoArray: OptionsInterface[];
  currentPolygonList: any[];
  showTrue: boolean;

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              private dataService: CameraManagementListInfoService, private positionPickerService: PositionPickerService,
              private positionPickerPolygonService: PositionPickerPolygonService) {
    this.returnBack = new EventEmitter<any>();
    this.showTrue = true;
    this.unitTypeOptions = [];
    this.sensorTypeOptions = [];
    this.HazardNatureOptions = [];
    this.majorList = [
      { value: '1', label: '储罐' },
      { value: '2', label: '库房' },
      { value: '3', label: '生产场所' },
    ];
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
    const dataInfo = await this.dataService.getCameraInfoDetail(this.id);
    this.validateForm.patchValue(dataInfo);
    this.cdr.markForCheck();
  }

  showPolygonMap() {
    this.positionPickerPolygonService.show({
      isRemoteImage: true,
      longitude: enterpriseInfo.longitude,
      latitude: enterpriseInfo.latitude,
      currentPolygonList: this.currentPolygonList,
    }).then((res: ({ lat: number, lng: number }[])) => {
      const tempArray = [];
      if (res) {
        res.forEach(({ lat, lng }) => {
          const obj = { lat, lng };
          tempArray.push(obj);
        });
        this.currentPolygonList = [...tempArray];
        this.validateForm.get('majorScope').setValue(tempArray);
      }
    }).catch(e => null);
  }

  async getMajorList() {
    this.entprId = this.loginInfo.entprId;
    const data = await this.dataService.getMajorList(this.entprId);
    /*    data.majorHazardPartDTOS.forEach(item => {
          this.majorAllNo.push({
            partType: item.partType,
            partNo: item.partNo,
            partName: item.partName,
            partId: item.partId,
          });
        });*/
  }

  returnToList() {
    this.returnBack.emit();
  }

  showMap() {
    this.positionPickerService.show({
      isRemoteImage: true,
      longitude: enterpriseInfo.longitude,
      latitude: enterpriseInfo.latitude,
    }).then(res => {
      this.validateForm.get('longitude').setValue(res.longitude);
      this.validateForm.get('latitude').setValue(res.latitude);
    }).catch(e => null);
  }

  ngOnInit(): void {
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.getMajorList();
    this.initForm();
    if (this.id) {
      this.getDetail();
    }
  }


}
