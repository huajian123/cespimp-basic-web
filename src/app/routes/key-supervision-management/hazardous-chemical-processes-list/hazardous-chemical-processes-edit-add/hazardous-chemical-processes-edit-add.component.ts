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
import { EVENT_KEY } from '@env/staticVariable';
import { HazardousChemicalProcessesInfoService } from '@core/biz-services/key-supervision-management/hazardous-chemical-processes.service';


@Component({
  selector: 'app-key-supervision-management-hazardous-chemical-processes-edit-add',
  templateUrl: './hazardous-chemical-processes-edit-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeySupervisionManagementHazardousChemicalProcessesEditAddComponent implements OnInit {
  validateForm: FormGroup;
  form: FormGroup;
  @Input() id: number;
  @Input() currentPageNum: number;
  @Output() returnBack: EventEmitter<any>;
  loginInfo: LoginInfoModel;

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              private dataService: HazardousChemicalProcessesInfoService, private positionPickerService: PositionPickerService) {
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
      processName: [null, [Validators.required]],
    });
  }

  async getDetail() {
    const dataInfo = await this.dataService.getHazardousChemicalProcessesInfoDetail(this.id);
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
    params.updateBy = this.loginInfo.realName;
    params.createBy = this.loginInfo.realName;
    let submitHandel = null;
    if (!this.id) {
      submitHandel = this.dataService.addHazardousChemicalProcesses(params);
    } else {
      params.id = this.id;
      submitHandel = this.dataService.editHazardousChemicalProcesses(params);
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
