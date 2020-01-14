import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { PositionPickerService } from '../../../../widget/position-picker/position-picker.service';
import { LoginInfoModel } from '@core/vo/comm/BusinessEnum';
import { EVENT_KEY } from '@env/staticVariable';
import { MapPipe, MapSet } from '@shared/directives/pipe/map.pipe';
import {
  SensorManagementListInfoService, SensorManagementListServiceNs,
} from '@core/biz-services/sensor-management/sensor-management.service';
import MajorHazardUnitList = SensorManagementListServiceNs.MajorHazardUnitList;
import SensorManagementListInfoModel = SensorManagementListServiceNs.SensorManagementListInfoModel;


interface OptionsInterface {
  value: string | number;
  label: string;
}

interface PartNoOptionsInterface extends OptionsInterface {
  partNo: string | number;
}


enum sensorTypeNum {
  temperature = 1,
  press = 2,
  level = 3,
}


@Component({
  selector: 'app-sensor-management-sensor-list-edit-add',
  templateUrl: './sensor-list-edit-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorManagementSensorListEditAddComponent implements OnInit {
  validateForm: FormGroup;
  @Input() id: number;
  @Input() entprId: number;
  @Input() currentPageNum: number;
  @Output() returnBack: EventEmitter<any>;
  loginInfo: LoginInfoModel;
  unitTypeOptions: OptionsInterface[];
  sensorTypeOptions: OptionsInterface[];
  HazardNatureOptions: OptionsInterface[];
  majorHazardTypeList: OptionsInterface[];
  majorHazardNameList: OptionsInterface[];
  selMajorNoArray: PartNoOptionsInterface[];
  currentPolygonList: any[];
  unitOptions: OptionsInterface[];
  dataNameList: any;
  hazardObject: MajorHazardUnitList[];
  dataInfo: SensorManagementListInfoModel;

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              private dataService: SensorManagementListInfoService, private positionPickerService: PositionPickerService) {
    this.returnBack = new EventEmitter<any>();
    //this.showTrue = true;
    this.unitTypeOptions = [];
    this.sensorTypeOptions = [];
    this.HazardNatureOptions = [];
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
      sensorNo: [null, [Validators.required]],
      sensorName: [null, [Validators.required]],
      sensorType: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      locFactory: [null, []],
      majorHazardId: [null, []],
      partId: [null, []],
      unit: [null, []],
      partType: [null, []],
      partNo: [null, []],
      firstAlarmThreshold: [null, []],
      secondAlarmThreshold: [null, []],
      thirdAlarmThreshold: [null, []],
      fourthAlarmThreshold: [null, []],
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
      submitHandel = this.dataService.addSensor(params);
    } else {
      params.id = this.id;
      params.updateBy = this.loginInfo.userName;
      submitHandel = this.dataService.editSensor(params);
    }

    await submitHandel;
    this.returnBack.emit({ refesh: true, pageNo: this.currentPageNum });
  }


  async getMajorNameList() {
    this.entprId = this.loginInfo.entprId;
    this.dataNameList = await this.dataService.getMajorHazardNameList(this.entprId);
    this.dataNameList.forEach(({ majorHazardId, majorHazardName }) => {
      this.majorHazardNameList.push({ label: majorHazardName, value: majorHazardId });
    });
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


  returnToList() {
    this.returnBack.emit();
  }

  async getDetail() {
    this.dataInfo = await this.dataService.getSensorInfoDetail(this.id);
    this.validateForm.get('majorHazardId').setValue(this.dataInfo.majorHazardId);
    setTimeout(() => {
      this.validateForm.get('partType').setValue(this.dataInfo.partType);
      this.validateForm.get('partId').setValue(this.dataInfo.partId);
      this.validateForm.get('partNo').setValue(this.dataInfo.partNo);
      this.cdr.markForCheck();
    }, 300);
    this.validateForm.patchValue(this.dataInfo);
    this.cdr.markForCheck();
  }

  changeSensorType(e) {
    this.unitOptions = [];
    switch (e) {
      case sensorTypeNum.temperature:
        this.unitOptions = [
          { value: '℃', label: '℃' },
          { value: '℉', label: '℉' },
        ];
        break;
      case  sensorTypeNum.press:
        this.unitOptions = [
          { value: 'Pa', label: 'Pa' },
          { value: 'hPa', label: 'hPa' },
          { value: 'kPa', label: 'kPa' },
        ];
        break;
      case  sensorTypeNum.level:
        this.unitOptions = [
          { value: 'MM', label: 'MM' },
          { value: 'CM', label: 'CM' },
          { value: 'M', label: 'M' },
        ];
        break;
      default:
        return;
    }
  }


  showMap() {
    const longitude = this.validateForm.get('longitude').value;
    const latitude = this.validateForm.get('latitude').value;
    const isEntprScope = this.dataInfo.entprScope;
    this.positionPickerService.show({
      isRemoteImage: true,
      longitude: longitude,
      latitude: latitude,
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
      const selMajorNoArray = this.hazardObject.find((item, index) => {
        return item.partType === e;
      });
      this.selMajorNoArray.length = 0;
      selMajorNoArray.partNames.forEach((item) => {
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
    this.sensorTypeOptions = [...MapPipe.transformMapToArray(MapSet.sensorType)];
    this.getMajorNameList();
    this.initForm();
    if (this.id) {
      this.getDetail();
    }
  }


}
