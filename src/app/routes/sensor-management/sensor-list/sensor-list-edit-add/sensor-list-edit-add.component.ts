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
import { enterpriseInfo } from '@env/environment';
import { EVENT_KEY } from '@env/staticVariable';
import { MapPipe, MapSet } from '@shared/directives/pipe/map.pipe';
import {
  SensorManagementListInfoService,
} from '@core/biz-services/sensor-management/sensor-management.service';
import { transform } from 'd3';

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

enum sensorTypeNum {
  number = 3
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
  majorList: OptionsInterface[];
  majorAllNo: MajorHazardPartModel[];
  majorHazardInfoNeed: OptionsInterface[];
  selMajorNoArray: OptionsInterface[];
  currentPolygonList: any[];
  showTrue: boolean;

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              private dataService: SensorManagementListInfoService, private positionPickerService: PositionPickerService) {
    this.returnBack = new EventEmitter<any>();
    this.showTrue = true;
    this.unitTypeOptions = [];
    this.sensorTypeOptions = [];
    this.HazardNatureOptions = [];
    this.majorHazardInfoNeed = [];
    this.majorAllNo = [];
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
      sensorNo: [null, [Validators.required]],
      sensorName: [null, [Validators.required]],
      sensorType: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      locFactory: [null, []],
      majorHazardId: [null, []],
      partId: [null, []],
      partType: [null, []],
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

  getPartNameOptions(type) {
    //console.log(type);
    const tempArray = this.majorAllNo.filter(item => { // type为当前选中的重大危险源type
      return '' + item.partType === '' + type;
    });
    this.selMajorNoArray = [];//先初始化一个类型下面的list菜单内容
    tempArray.forEach(item => {
      const objArray = { value: item.partId, label: item.partName, partType: item.partType };
      this.selMajorNoArray.push(objArray);//循环插入当前类型下面的list下拉内容菜单需传递的参数（partId，partName，partType）；
    });
  }

// 重大危险源type类型选取改变
  changeMajorType(type) {
    this.getPartNameOptions(type);
    this.validateForm.get('partId').reset();
  }


  async getMajorList() {
    this.entprId = this.loginInfo.entprId;
    const data = await this.dataService.getMajorList(this.entprId);
    data.majorHazardPartDTOS.forEach(item => {
      const HazardPartObject = {
        partType: item.partType,
        partNo: item.partNo,
        partName: item.partName,
        partId: item.partId,
      };
      this.majorAllNo.push(HazardPartObject);
    });
    data.majorHazardInfoNeedListDTOS.forEach(({ majorHazardId, majorHazardName }) => {
      this.majorHazardInfoNeed.push({ label: majorHazardName, value: majorHazardId });
    });
    this.cdr.markForCheck();
  }


  returnToList() {
    this.returnBack.emit();
  }

  async getDetail() {
    const dataInfo = await this.dataService.getSensorInfoDetail(this.id);
    //console.log(dataInfo);
    this.getPartNameOptions(dataInfo.partType);
    const selObject = this.selMajorNoArray.find(item => {
      return item.label;
    });
    //console.log(selObject);
    //this.validateForm.get('partType').setValue(selObject.partType);
    this.validateForm.get('partId').setValue(selObject.label);
    //dataInfo.partType = new MapPipe().transform(dataInfo.partType, 'partType');
    this.validateForm.patchValue(dataInfo);
    this.cdr.markForCheck();
  }

  changeSensorType(e) {
    switch (e) {
      case sensorTypeNum.number:
        this.showTrue = false;
        break;
      default:
        this.showTrue = true;
        break;
    }
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
    this.sensorTypeOptions = [...MapPipe.transformMapToArray(MapSet.sensorType)];
    this.getMajorList();
    this.initForm();
    if (this.id) {
      this.getDetail();
    }
  }


}
