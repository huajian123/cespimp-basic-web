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
import { SpecialOperationInfoService } from '@core/biz-services/special-operation-management/special-operation-management.service';

interface OptionsInterface {
  value: string;
  label: string;
}

@Component({
  selector: 'app-special-operation-management-confined-space-work-edit-add',
  templateUrl: './confined-space-work-edit-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialOperationManagementConfinedSpaceWorkEditAddComponent implements OnInit {
  validateForm: FormGroup;
  form: FormGroup;
  @Input() id: number;
  @Input() currentPageNum: number;
  @Output() returnBack: EventEmitter<any>;
  loginInfo: LoginInfoModel;
  operationOptions: OptionsInterface[];

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef, private dataService: SpecialOperationInfoService) {
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
      operationType: [null, [Validators.required]],
      operationName: [null, [Validators.required]],
      operationPlace: [null, [Validators.required]],
      operationPerson: [null, [Validators.required]],
      operationContent: [null, [Validators.required]],
      operationCertificate: [null, [Validators.required]],
      applicationName: [null, [Validators.required]],
      applicationTime: [null, [Validators.required]],
      guardianName: [null, [Validators.required]],
      leadingName: [null, [Validators.required]],
      operationStartTime: [null, [Validators.required]],
      operationEndTime: [null, [Validators.required]],
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
       submitHandel = this.dataService.addSpecialOperation(params);
    } else {
      params.id = this.id;
      submitHandel = this.dataService.editSpecialOperation(params);
    }
    await submitHandel;
    this.returnBack.emit({ refesh: true, pageNo: this.currentPageNum });
  }

  returnToList() {
    this.returnBack.emit();
  }

  async getDetail() {
    const dataInfo = await this.dataService.getSpecialOperationInfoDetail(this.id);
    this.validateForm.patchValue(dataInfo);
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.initForm();
    if (this.id) {
      this.getDetail();
    }
  }
}
