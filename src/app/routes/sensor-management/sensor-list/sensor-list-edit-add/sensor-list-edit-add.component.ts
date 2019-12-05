import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { MajorHazardListInfoService } from '@core/biz-services/major-hazard-management/major-hazard-list.service';
import { PositionPickerService } from '../../../../widget/position-picker/position-picker.service';
import { PositionPickerPolygonService } from '../../../../widget/position-picker-polygon/position-picker-polygon.service';
import { LoginInfoModel } from '@core/vo/comm/BusinessEnum';


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

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              private dataService: MajorHazardListInfoService, private positionPickerService: PositionPickerService,
              private positionPickerPolygonService: PositionPickerPolygonService) {
    this.returnBack = new EventEmitter<any>();
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
  }

  initForm() {
    this.validateForm = this.fb.group({
      majorHazardNo: [null, [Validators.required]],
      majorHazardName: [null, [Validators.required]],
      unitType: [null, [Validators.required]],
      majorHazardLevel: [null, [Validators.required]],
      majorHazardNature: [null, []],
      manager: [null, []],
      useDate: [null, []],
      rvalue: [null, []],
      managerMobile: [null, []],
      description: [null, []],
      majorScope: [null, [Validators.required]],
      locFactory: [null, []],
      majorHazardUnits: <FormArray>this.fb.array([]),
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
    if ((this.validateForm.controls['majorHazardUnits'] as FormGroup).invalid) {
      return;
    }
    const params = this.validateForm.getRawValue();
    params.entprId = this.loginInfo.entprId;
    let submitHandel = null;
    if (!this.id) {
      params.createBy = this.loginInfo.userName;
      submitHandel = this.dataService.addMajorHazard(params);
    } else {
      params.id = this.id;
      params.updateBy = this.loginInfo.userName;
      submitHandel = this.dataService.editMajorHazard(params);
    }

    await submitHandel;
    this.returnBack.emit({ refesh: true, pageNo: this.currentPageNum });
  }
  showPolygonMap(){

  }
  returnToList() {
    this.returnBack.emit();
  }
  ngOnInit(): void {

  }


}
