import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  CertificateInfoService,
  CertificateInfoServiceNs,
} from '@core/biz-services/basic-info/certificate-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginInfoModel } from '@core/vo/comm/BusinessEnum';
import IdCardTabModel = CertificateInfoServiceNs.IdCardTabModel;
import { EVENT_KEY } from '@env/staticVariable';
import { MapPipe } from '@shared/directives/pipe/map.pipe';
import { environment, getwayKey } from '@env/environment';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';


export enum FileImgEnum {
  BusinessLicenseImg,  // 营业执照
  SafetyReportImg, // 安全报告
  SafetyCertificateImg,// 安全许可
  EnvironmentReportImg,// 环评报告
  DischargePermitImg,// 排污报告
}

@Component({
  selector: 'app-basic-info-certificate-info',
  templateUrl: './certificate-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfoCertificateInfoComponent implements OnInit {
  uploadUrl: string;
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true,
  };
  businessFileList: any[];
  safetyReportFileList: any[];
  safetyCertificateFileList: any[];
  dischargePermitFileList: any[];
  environmentReportFileList: any[];
  previewImage: string | undefined = '';
  previewVisible = false;
  validateForm: FormGroup;
  form: FormGroup;
  loginInfo: LoginInfoModel;
  dataInfo: IdCardTabModel;
  @Input() id: number;
  isAdd: boolean;

  constructor(private fb: FormBuilder, private dataService: CertificateInfoService, private cdr: ChangeDetectorRef, private msg: NzMessageService) {
    this.previewVisible = false;
    this.previewImage = '';
    this.businessFileList = [];
    this.safetyCertificateFileList = [];
    this.safetyReportFileList = [];
    this.dischargePermitFileList = [];
    this.environmentReportFileList = [];
    this.uploadUrl = environment.baseUrl[getwayKey.Bs] + 'upload?_allow_anonymous=true';
    // console.log(this.uploadUrl);
    this.isAdd = true;

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
    if ('' + file.name === '' + FileImgEnum.SafetyCertificateImg) {
      this.validateForm.get('safetyCertificateAccessory').setValue(null);
    }
    if ('' + file.name === '' + FileImgEnum.BusinessLicenseImg) {
      this.validateForm.get('businessLicencesAccessory').setValue(null);
    }
    if ('' + file.name === '' + FileImgEnum.SafetyReportImg) {
      this.validateForm.get('safetyReportAccessory').setValue(null);
    }
    if ('' + file.name === '' + FileImgEnum.EnvironmentReportImg) {
      this.validateForm.get('environmentReportAccessory').setValue(null);
    }
    if ('' + file.name === '' + FileImgEnum.DischargePermitImg) {
      this.validateForm.get('dischargePermitAccessory').setValue(null);
    }
    this.validateForm.updateValueAndValidity();
    return true;
  };

  initForm() {
    this.validateForm = this.fb.group({
      uscCode: [null, [Validators.required]],
      effectiveRange: [null, [Validators.required]],
      businessLicencesRange: [null, [Validators.required]],
      businessLicencesAuthority: [null, [Validators.required]],
      safetyCertificateCode: [null, [Validators.required]],
      effectiveRange1: [null, [Validators.required]],
      safetyPermitRange: [null, [Validators.required]],
      safetyCertificateAuthority: [null, [Validators.required]],
      dischargePermitCode: [null, [Validators.required]],
      effectiveRange2: [null, [Validators.required]],
      dischargePermitType: [null, [Validators.required]],
      dischargePermitAuthority: [null, [Validators.required]],
      safetyReportName: [null, [Validators.required]],
      safetyReportRecordTime: [null, [Validators.required]],
      safetyReportAgency: [null, [Validators.required]],
      environmentReportName: [null, [Validators.required]],
      environmentRecordTime: [null, [Validators.required]],
      environmentReportAgency: [null, [Validators.required]],
      safetyReportAccessory: [null, []],
      businessLicencesAccessory: [null, []],
      safetyCertificateAccessory: [null, []],
      environmentReportAccessory: [null, []],
      dischargePermitAccessory: [null, []],
    });
  }

  async getIdCardInfo() {
    const param = this.loginInfo.entprId;
    const dataInfo = await this.dataService.getIdCardInfoDetail(param);
    const beginTime = new MapPipe().transform(dataInfo.businessLicencesBeginTime, 'date:yyyy-MM-dd');
    const endTime = new MapPipe().transform(dataInfo.businessLicencesEndTime, 'date:yyyy-MM-dd');
    const beginTime1 = new MapPipe().transform(dataInfo.safetyCertificateBeginTime, 'date:yyyy-MM-dd');
    const endTime1 = new MapPipe().transform(dataInfo.safetyCertificateEndTime, 'date:yyyy-MM-dd');
    const beginTime2 = new MapPipe().transform(dataInfo.dischargePermitBeginTime, 'date:yyyy-MM-dd');
    const endTime2 = new MapPipe().transform(dataInfo.dischargePermitEndTime, 'date:yyyy-MM-dd');
    dataInfo.safetyReportRecordTime = new MapPipe().transform(dataInfo.safetyReportRecordTime, 'date:yyyy-MM-dd');
    dataInfo.environmentRecordTime = new MapPipe().transform(dataInfo.environmentRecordTime, 'date:yyyy-MM-dd');
    dataInfo.effectiveRange = [beginTime, endTime];
    dataInfo.effectiveRange1 = [beginTime1, endTime1];
    dataInfo.effectiveRange2 = [beginTime2, endTime2];
    this.validateForm.patchValue(dataInfo);
    this.dataInfo = dataInfo;
    this.cdr.markForCheck();
  }

  // 提交表单
  async submitForm() {
    Object.keys(this.validateForm.controls).forEach(key => {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    });
    if (this.validateForm.invalid) {
      return;
    } else {
      const params = this.validateForm.getRawValue();
      params.entprId = this.loginInfo.entprId;
      params.updateBy = this.loginInfo.realName;
      params.businessLicencesBeginTime = params.effectiveRange[0];
      params.businessLicencesEndTime = params.effectiveRange[1];
      params.safetyCertificateBeginTime = params.effectiveRange1[0];
      params.safetyCertificateEndTime = params.effectiveRange1[1];
      params.dischargePermitBeginTime = params.effectiveRange2[0];
      params.dischargePermitEndTime = params.effectiveRange2[1];
      let submitHandel = null;
      submitHandel = this.dataService.editIdCardInfoDetail(params);
      await submitHandel;
      this.msg.success(`提交成功`);
    }
  }

  async ngOnInit() {
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.initForm();
    await this.getIdCardInfo();
    if (this.dataInfo !== null) {
      this.isAdd = false;
      // console.log(this.dataInfo);
      this.validateForm.patchValue(this.dataInfo);
      this.businessFileList = [{
        name: FileImgEnum.BusinessLicenseImg,
        status: 'done',
        url: this.dataInfo.businessLicencesAccessory,
      }];
      this.safetyReportFileList = [
        {
          name: FileImgEnum.SafetyReportImg,
          status: 'done',
          url: this.dataInfo.safetyReportAccessory,
        },
      ];
      this.safetyCertificateFileList = [
        {
          name: FileImgEnum.SafetyCertificateImg,
          status: 'done',
          url: this.dataInfo.safetyCertificateAccessory,
        },
      ];
      this.environmentReportFileList = [
        {
          name: FileImgEnum.EnvironmentReportImg,
          status: 'done',
          url: this.dataInfo.environmentReportAccessory,
        },
      ];
      this.dischargePermitFileList = [
        {
          name: FileImgEnum.DischargePermitImg,
          status: 'done',
          url: this.dataInfo.dischargePermitAccessory,
        },
      ];
    }
    this.cdr.markForCheck();
  }
}

