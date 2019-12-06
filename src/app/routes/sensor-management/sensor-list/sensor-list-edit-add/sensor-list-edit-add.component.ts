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
import { PositionPickerPolygonService } from '../../../../widget/position-picker-polygon/position-picker-polygon.service';
import { LoginInfoModel } from '@core/vo/comm/BusinessEnum';
import { enterpriseInfo } from '@env/environment';
import { EVENT_KEY } from '@env/staticVariable';
import { MapPipe, MapSet } from '@shared/directives/pipe/map.pipe';
import { SensorManagementListInfoService } from '@core/biz-services/sensor-management/sensor-management.service';

interface OptionsInterface {
  value: string | number;
  label: string;
  partType?: number;
}


@Component({
  selector: 'app-sensor-management-sensor-list-edit-add',
  templateUrl: './sensor-list-edit-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorManagementSensorListEditAddComponent implements OnInit {
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

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              private dataService: SensorManagementListInfoService, private positionPickerService: PositionPickerService,
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
      sensorNo: [null, [Validators.required]],
      sensorName: [null, [Validators.required]],
      sensorType: [null, [Validators.required]],
      majorScope: [null, [Validators.required]],
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


  returnToList() {
    this.returnBack.emit();
  }

  changeSensorType(e) {
    switch (e) {
      case 3:
        this.showTrue = false;
        break;
      default:
        this.showTrue = true;
        break;
    }
  }

  ngOnInit(): void {
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.sensorTypeOptions = [...MapPipe.transformMapToArray(MapSet.sensorType)];
    this.initForm();
  }


}
