import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PositionPickerService } from '../../../widget/position-picker/position-picker.service';
import { LoginInfoModel } from '@core/vo/comm/BusinessEnum';
import { EVENT_KEY } from '@env/staticVariable';
import { TankListInfoService } from '@core/biz-services/storage-tank-management/tank-list.service';
import { MapPipe, MapSet } from '@shared/directives/pipe/map.pipe';


interface OptionsInterface {
  value: string;
  label: string;
}

@Component({
  selector: 'app-storage-tank-management-tank-list-edit-add',
  templateUrl: './tank-list-edit-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorageTankManagementTankListEditAddComponent implements OnInit {
  tankFormOptions: OptionsInterface[];
  tankStructureOptions: OptionsInterface[];
  tankMateOptions: OptionsInterface[];
  tankTypeOptions: OptionsInterface[];
  validateForm: FormGroup;
  loginInfo: LoginInfoModel;


  @Input() id: number;
  @Input() currentPageNum: number;
  @Output() returnBack: EventEmitter<any>;
  editIndex = -1;
  editObj = {};

  constructor(private fb: FormBuilder, private positionPickerService: PositionPickerService, private dataService: TankListInfoService,
              private cdr: ChangeDetectorRef) {
    this.returnBack = new EventEmitter<any>();
  }

  initForm() {
    this.validateForm = this.fb.group({
      tankNo: [null, [Validators.required]],
      tankName: [null, [Validators.required]],
      tankType: [null, [Validators.required]],
      tankForm: [null, [Validators.required]],
      tankStructure: [null, [Validators.required]],
      tankMate: [null, [Validators.required]],
      tankCapacity: [null, [Validators.required]],
      productionDate: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      locFactory: [null, [Validators.required]],
      majorHazardMaterialInsertDTOS: this.fb.array([]) as FormArray,
    });
  }


  showMap() {
    this.positionPickerService.show({ isRemoteImage: true }).then(res => {
      this.validateForm.get('longitude').setValue(res.longitude);
      this.validateForm.get('latitude').setValue(res.latitude);
    }).catch(e => null);
  }

  initTypeOptions() {
    this.tankTypeOptions = [...MapPipe.transformMapToArray(MapSet.tankType)];
    this.tankFormOptions = [...MapPipe.transformMapToArray(MapSet.tankForm)];
    this.tankStructureOptions = [...MapPipe.transformMapToArray(MapSet.tankStructure)];
    this.tankMateOptions = [...MapPipe.transformMapToArray(MapSet.tankMate)];
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

  // 提交表单
  async _submitForm() {
    Object.keys(this.validateForm.controls).forEach(key => {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    });

    if (this.validateForm.invalid) return;
    if ((this.validateForm.controls.majorHazardMaterialInsertDTOS as FormGroup).invalid) {
      return;
    }


    const params = this.validateForm.getRawValue();
    params.entprId = this.loginInfo.entprId;
    params.updateBy = this.loginInfo.updateBy;
    let submitHandel = null;

    if (!this.id) {
      params.createBy = this.loginInfo.realName;
      submitHandel = this.dataService.addTank(params);
    } else {
      params.id = this.id;
      params.updateBy = this.loginInfo.realName;
      submitHandel = this.dataService.editTank(params);
    }

    await submitHandel;
    this.returnBack.emit({ refesh: true, pageNo: this.currentPageNum });
  }


  returnToList() {
    this.returnBack.emit({ refesh: false, pageNo: this.currentPageNum });
  }


  async getDetail() {
    const dataInfo = await this.dataService.getTankInfoDetail(this.id);
    this.validateForm.patchValue(dataInfo);
    dataInfo.majorHazardMaterials.forEach(item => {
      const field = this.createMedium();
      field.patchValue(item);
      this.mediumArray.push(field);
    });
    this.cdr.markForCheck();
  }

  ngOnInit() {
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.initForm();
    this.initTypeOptions();
    if (this.id) {
      this.getDetail();
    }
  }

}
