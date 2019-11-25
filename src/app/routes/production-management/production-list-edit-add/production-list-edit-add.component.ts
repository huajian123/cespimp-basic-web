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
import { PositionPickerService } from '../../../widget/position-picker/position-picker.service';
import { LoginInfoModel } from '@core/vo/comm/BusinessEnum';
import { ProductionListInfoService } from '@core/biz-services/production-management/production-list.service';
import { EVENT_KEY } from '@env/staticVariable';

@Component({
  selector: 'app-production-management-production-list-edit-add',
  templateUrl: './production-list-edit-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductionManagementProductionListEditAddComponent implements OnInit {
  validateForm: FormGroup;
  form: FormGroup;
  @Input() id: number;
  @Input() currentPageNum: number;
  @Output() returnBack: EventEmitter<any>;
  loginInfo: LoginInfoModel;
  editIndex = -1;
  editObj = {};

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              private dataService: ProductionListInfoService, private positionPickerService: PositionPickerService) {
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
      placeNo: [null, [Validators.required]],
      placeName: [null, [Validators.required]],
      placeArea: [null, []],
      productionDate: [null, []],
      longitude: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      locFactory: [null, []],
      majorHazardMaterialInsertDTOS: <FormArray>this.fb.array([]),
    });
  }

  async getDetail() {
    const dataInfo = await this.dataService.getProductionInfoDetail(this.id);
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

  showMap() {
    this.positionPickerService.show({ isRemoteImage: true }).then(res => {
      this.validateForm.get('longitude').setValue(res.longitude);
      this.validateForm.get('latitude').setValue(res.latitude);
    }).catch(e => null);
  }

  async submit() {
    Object.keys(this.validateForm.controls).forEach(key => {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    });
    if (this.validateForm.invalid) {
      return;
    }
    if ((this.validateForm.controls['majorHazardMaterialInsertDTOS'] as FormGroup).invalid) {
      return;
    }
    const params = this.validateForm.getRawValue();
    params.entprId = this.loginInfo.entprId;
    params.updateBy = this.loginInfo.userName;
    params.createBy = this.loginInfo.userName;
    let submitHandel = null;

    if (!this.id) {
      submitHandel = this.dataService.addProduction(params);
    } else {
      params.id = this.id;
      submitHandel = this.dataService.editProduction(params);
    }

    await submitHandel;
    this.returnBack.emit({ refesh: true, pageNo: this.currentPageNum });
  }

  ngOnInit() {
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.initForm();
    if (this.id) {
      this.getDetail();
    }
  }

}
