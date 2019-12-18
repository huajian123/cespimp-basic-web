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
import { LoginInfoModel } from '@core/vo/comm/BusinessEnum';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import {
  SpecialOperationInfoService,
  SpecialOperationManagementServiceNs,
} from '@core/biz-services/special-operation-management/special-operation-management.service';
import { environment, getwayKey } from '@env/environment';
import { EVENT_KEY } from '@env/staticVariable';
import SpecialInfoEnum = SpecialOperationManagementServiceNs.SpecialInfoEnum;


@Component({
  selector: 'app-special-operation-management-blind-plate-edit-add',
  templateUrl: './blind-plate-edit-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialOperationManagementBlindPlateEditAddComponent implements OnInit {
  uploadUrl: string;
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true,
  };
  certificateFileList: any[];
  previewImage: string | undefined = '';
  previewVisible = false;
  validateForm: FormGroup;
  form: FormGroup;
  @Input() id: number;
  @Input() currentPageNum: number;
  @Output() returnBack: EventEmitter<any>;
  loginInfo: LoginInfoModel;

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef, private dataService: SpecialOperationInfoService) {
    this.returnBack = new EventEmitter<any>();
    this.previewVisible = false;
    this.previewImage = '';
    this.certificateFileList = [];
    this.uploadUrl = environment.baseUrl[getwayKey.Bs] + 'upload?_allow_anonymous=true';
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
      operationType: [null, []],
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
    params.operationType = SpecialInfoEnum.BlindPlate;
    submitHandel = this.dataService.addSpecialOperation(params);
    await submitHandel;
    this.returnBack.emit({ refesh: true, pageNo: this.currentPageNum });
    this.cdr.markForCheck();
  }

  returnToList() {
    this.returnBack.emit();
  }

  async getDetail() {
    const dataInfo = await this.dataService.getSpecialOperationInfoDetail(this.id);
    this.validateForm.patchValue(dataInfo);
    this.cdr.markForCheck();
  }

  uploadFn(e, formControlName: string) {
    if (e.type === 'success') {
      if (e.file.response.code === 0) {
        this.validateForm.get(formControlName).setValue(e.file.response.data);
      }
    }
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };
  handleRemove = (file: UploadFile): boolean => {
    this.validateForm.get('operationCertificate').setValue(null);
    this.validateForm.updateValueAndValidity();
    return true;
  };

  ngOnInit(): void {
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.initForm();
    if (this.id) {
      this.getDetail();
    }
  }
}
