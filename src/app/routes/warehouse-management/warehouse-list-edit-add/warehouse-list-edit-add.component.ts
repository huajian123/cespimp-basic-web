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
import { WarehouseListInfoService } from '@core/biz-services/warehouse-management/warehouse-list.service';
import { MapPipe, MapSet } from '@shared/directives/pipe/map.pipe';
import { LoginInfoModel } from '@core/vo/comm/BusinessEnum';
import { PositionPickerService } from '../../../widget/position-picker/position-picker.service';
import { EVENT_KEY } from '@env/staticVariable';

interface OptionsInterface {
  value: string;
  label: string;
}

@Component({
  selector: 'app-warehouse-management-warehouse-list-edit-add',
  templateUrl: './warehouse-list-edit-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarehouseManagementWarehouseListEditAddComponent implements OnInit {
  validateForm: FormGroup;
  form: FormGroup;
  @Input() id: number;
  @Input() currentPageNum: number;
  @Output() returnBack: EventEmitter<any>;
  fireLevelOptions: OptionsInterface[];
  roomFormOptions: OptionsInterface[];
  loginInfo: LoginInfoModel;
  editIndex = -1;
  editObj = {};

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              private dataService: WarehouseListInfoService, private positionPickerService: PositionPickerService) {
    this.returnBack = new EventEmitter<any>();
    this.fireLevelOptions = [];
    this.roomFormOptions = [];
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
      roomNo: [null, [Validators.required]],
      roomName: [null, [Validators.required]],
      roomArea: [null, []],
      roomForm: [null, []],
      fireLevel: [null, []],
      longitude: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      locFactory: [null, []],
      majorHazardMaterialInsertDTOS: this.fb.array([]) as FormArray,
    });
  }

  async getDetail() {
    const dataInfo = await this.dataService.getWarehouseInfoDetail(this.id);
    this.validateForm.patchValue(dataInfo);
    dataInfo.majorHazardMaterials.forEach(item => {
      const field = this.createMedium();
      field.patchValue(item);
      this.mediumArray.push(field);
    });
    this.cdr.markForCheck();
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
    if ((this.validateForm.controls.majorHazardMaterialInsertDTOS as FormGroup).invalid) {
      return;
    }
    const params = this.validateForm.getRawValue();
    params.entprId = this.loginInfo.entprId;
    params.createBy = this.loginInfo.userName;
    params.updateBy = this.loginInfo.userName;
    let submitHandel = null;

    if (!this.id) {
      submitHandel = this.dataService.addWarehouse(params);
    } else {
      params.id = this.id;
      submitHandel = this.dataService.editWarehouse(params);
    }

    await submitHandel;
    this.returnBack.emit({ refesh: true, pageNo: this.currentPageNum });
  }

  showMap() {
    const longitude = this.validateForm.get('longitude').value;
    const latitude = this.validateForm.get('latitude').value;
    this.positionPickerService.show({
      isRemoteImage: true, longitude: longitude,
      latitude: latitude,
      zoom: 18,
    }).then(res => {
      this.validateForm.get('longitude').setValue(res.longitude);
      this.validateForm.get('latitude').setValue(res.latitude);
    }).catch(e => null);
  }

  // 创建介质
  createMedium(): FormGroup {
    return this.fb.group({
      productName: [null, [Validators.required]],
      casNo: [null, [Validators.required]],
      criticalMass: [null, [Validators.required]],
      maximumReserves: [null, [Validators.required]],
      entprId: [this.loginInfo.entprId],
    });
  }

  //#region get form fields
  get mediumArray() {
    return this.validateForm.controls.majorHazardMaterialInsertDTOS as FormArray;
  }

  //#endregion

  // 新增介质
  add() {
    this.mediumArray.push(this.createMedium());
    this.edit(this.mediumArray.length - 1);
  }

  // 删除介质
  del(index: number) {
    this.mediumArray.removeAt(index);
  }

  // 编辑介质
  edit(index: number) {
    if (this.editIndex !== -1 && this.editObj) {
      this.mediumArray.at(this.editIndex).patchValue(this.editObj);
    }
    this.editObj = { ...this.mediumArray.at(index).value };
    this.editIndex = index;
  }

  // 保存单个介质
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

  ngOnInit() {
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.fireLevelOptions = [...MapPipe.transformMapToArray(MapSet.fireLevel)];
    this.roomFormOptions = [...MapPipe.transformMapToArray(MapSet.roomForm)];
    this.initForm();
    if (this.id) {
      this.getDetail();
    }

  }
}
