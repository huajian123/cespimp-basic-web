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
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginInfoModel } from '@core/vo/comm/BusinessEnum';
import { MajorHazardListInfoService } from '@core/biz-services/major-hazard-management/major-hazard-list.service';
import { EVENT_KEY } from '@env/staticVariable';
import { MapPipe, MapSet } from '@shared/directives/pipe/map.pipe';
import { PositionPickerService } from '../../../../widget/position-picker/position-picker.service';

interface OptionsInterface {
  value: string;
  label: string;
}

interface OptionInterface {
  label: string;
  value: number;
  type: number;
  id: number;
}

@Component({
  selector: 'app-major-hazard-management-major-hazard-edit-add',
  templateUrl: './major-hazard-edit-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MajorHazardManagementMajorHazardEditAddComponent implements OnInit {
  validateForm: FormGroup;
  form: FormGroup;
  @Input() id: number;
  @Input() entprId: number;
  @Input() currentPageNum: number;
  @Output() returnBack: EventEmitter<any>;
  unitTypeOptions: OptionsInterface[];
  HazardLevelOptions: OptionsInterface[];
  HazardNatureOptions: OptionsInterface[];
  loginInfo: LoginInfoModel;
  editIndex = -1;
  editObj = {};
  majorList: OptionInterface[];

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              private dataService: MajorHazardListInfoService, private positionPickerService: PositionPickerService) {
    this.returnBack = new EventEmitter<any>();
    this.majorList = [];
    this.unitTypeOptions = [];
    this.HazardLevelOptions = [];
    this.HazardNatureOptions = [];
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
      longitude: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      locFactory: [null, []],
      majorHazardUnitUpdateDTOS: <FormArray>this.fb.array([]),
    });
  }

  async getDetail() {
    const dataInfo = await this.dataService.getMajorHazardInfoDetail(this.id);
    this.validateForm.patchValue(dataInfo);
    dataInfo.majorHazardUnits.forEach(item => {
      const field = this.createMedium();
      field.patchValue(item);
      this.mediumArray.push(field);
    });
    this.cdr.markForCheck();
  }

  changeMajor(e) {
    const temp = this.majorList.filter(({ value }) => {
      return value === e;
    })[0];
    console.log(this.mediumArray);
    this.mediumArray.get('partType').setValue(temp.type);

  /*  this.mediumArray.get('partId').setValue(temp.id);*/
  }

  async getMajorList() {
    this.entprId = this.loginInfo.entprId;
    //console.log(this.entprId);
   const data = await this.dataService.getMajorList(this.entprId);
  /* console.log(data);*/
    data.majorHazardPartDTOS.forEach(item => {
      this.majorList.push({ label: item.partName, value: item.partNo, type: item.partType ,id:item.partId});
    });
  }

// 创建组成单元
  createMedium(): FormGroup {
    return this.fb.group({
      partType: [null, [Validators.required]],
      partNo: [null, [Validators.required]],
      entprId: [this.loginInfo.entprId],
      partId:[null,[]],
    });
  }

  //#region get form fields
  get mediumArray() {
    return this.validateForm.controls['majorHazardUnitUpdateDTOS'] as FormArray;
  }

  //#endregion
  // 新增组成单元
  add() {
    this.mediumArray.push(this.createMedium());
    this.edit(this.mediumArray.length - 1);
  }

  // 删除组成单元
  del(index: number) {
    this.mediumArray.removeAt(index);
  }

  // 编辑组成单元
  edit(index: number) {
    if (this.editIndex !== -1 && this.editObj) {
      this.mediumArray.at(this.editIndex).patchValue(this.editObj);
    }
    this.editObj = { ...this.mediumArray.at(index).value };
    this.editIndex = index;
  }

  // 保存单个组成单元
  save(index: number) {
    this.mediumArray.at(index).markAsDirty();
    if (this.mediumArray.at(index).invalid) return;
    this.editIndex = -1;
  }

  // 取消
  cancel(index: number) {
    if (!this.mediumArray.at(index).value.key) {
      this.del(index);
    } else {
      this.mediumArray.at(index).patchValue(this.editObj);
    }
    this.editIndex = -1;
  }

  returnToList() {
    this.returnBack.emit();
  }

  async submit() {
    Object.keys(this.validateForm.controls).forEach(key => {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    });
    if (this.validateForm.invalid) {
      return;
    }
    if ((this.validateForm.controls['majorHazardUnitUpdateDTOS'] as FormGroup).invalid) {
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

  showMap() {
    this.positionPickerService.show({ isRemoteImage: true }).then(res => {
      this.validateForm.get('longitude').setValue(res.longitude);
      this.validateForm.get('latitude').setValue(res.latitude);
    }).catch(e => null);
  }

  ngOnInit() {
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    //console.log(this.loginInfo);
    this.unitTypeOptions = [...MapPipe.transformMapToArray(MapSet.unitType)];
    this.HazardLevelOptions = [...MapPipe.transformMapToArray(MapSet.majorHazardLevel)];
    this.HazardNatureOptions = [...MapPipe.transformMapToArray(MapSet.majorHazardNature)];
    this.getMajorList();
    this.initForm();
    if (this.id) {
      this.getDetail();
    }
  }


}
