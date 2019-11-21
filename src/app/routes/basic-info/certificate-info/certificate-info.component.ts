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



@Component({
  selector: 'app-basic-info-certificate-info',
  templateUrl: './certificate-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfoCertificateInfoComponent implements OnInit {
  validateForm: FormGroup;
  form: FormGroup;
  loginInfo: LoginInfoModel;
  dataInfo: IdCardTabModel;
  @Input() id: number;
  constructor(private fb: FormBuilder,private dataService: CertificateInfoService, private cdr: ChangeDetectorRef) {
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
      uscCode: [null, [Validators.required]],
      businessLicencesBeginTime: [null, [Validators.required]],
    /*  businessLicencesEndTime: [null, []],*/
      businessLicencesRange: [null, [Validators.required]],
      businessLicencesAuthority: [null, [Validators.required]],
     /* businessLicencesAccessory: [null, []],*/
      safetyCertificateCode: [null, [Validators.required]],
      safetyCertificateBeginTime: [null, [Validators.required]],
     /* safetyCertificateEndTime: [null, []],*/
      safetyPermitRange: [null, [Validators.required]],
      safetyCertificateAuthority: [null, [Validators.required]],
     /* safetyCertificateAccessory: [null, []],*/
      dischargePermitCode: [null, [Validators.required]],
      dischargePermitBeginTime: [null, [Validators.required]],
     /* dischargePermitEndTime: [null, []],*/
      dischargePermitType: [null, [Validators.required]],
      dischargePermitAuthority: [null, [Validators.required]],
      safetyReportName: [null, [Validators.required]],
      safetyReportRecordTime: [null, [Validators.required]],
      safetyReportAgency: [null, [Validators.required]],
     /* safetyReportAccessory: [null, []],*/
      environmentReportName: [null, [Validators.required]],
      environmentRecordTime: [null, [Validators.required]],
      environmentReportAgency: [null, [Validators.required]],
     /* environmentReportAccessory: [null, []],*/
     /* dischargePermitAccessory: [null, []],*/
    });
  }
  async getIdCardInfo() {
    const dataInfo = await this.dataService.getIdCardInfoDetail(this.id);
   /* this.validateForm.patchValue(dataInfo);*/
    this.cdr.markForCheck();
  }
  ngOnInit() {
    this.initForm();
    this.getIdCardInfo();
  }
}
