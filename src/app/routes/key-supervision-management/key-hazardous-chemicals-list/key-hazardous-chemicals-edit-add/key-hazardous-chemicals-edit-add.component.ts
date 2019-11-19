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
import { EVENT_KEY } from '@env/staticVariable';
import { PositionPickerService } from '../../../../widget/position-picker/position-picker.service';
import { HazardousChemicalInfoService } from '@core/biz-services/key-supervision-management/key-hazardous-chemicals.service';

@Component({
  selector: 'app-key-supervision-management-key-hazardous-chemicals-edit-add',
  templateUrl: './key-hazardous-chemicals-edit-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeySupervisionManagementKeyHazardousChemicalsEditAddComponent implements OnInit {
  validateForm: FormGroup;
  form: FormGroup;
  @Input() id: number;
  @Input() currentPageNum: number;
  @Output() returnBack: EventEmitter<any>;
  loginInfo: LoginInfoModel;

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              private dataService: HazardousChemicalInfoService, private positionPickerService: PositionPickerService) {
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
      productName: [null, [Validators.required]],
      casNo: [null, [Validators.required]],
      alias: [null, []],
    });
  }

  async getDetail() {
    const dataInfo = await this.dataService.getHazardousChemicalInfoDetail(this.id);
    this.validateForm.patchValue(dataInfo);
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
    const params = this.validateForm.getRawValue();
    params.entprId = this.loginInfo.entprId;
    let submitHandel = null;
    if (!this.id) {
      submitHandel = this.dataService.addHazardousChemical(params);
    } else {
      params.id = this.id;
      submitHandel = this.dataService.editHazardousChemical(params);
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
