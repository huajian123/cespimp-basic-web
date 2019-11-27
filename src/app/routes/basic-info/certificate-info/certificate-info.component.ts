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
      /* safetyReportAccessory: [null, []],*/
      /* businessLicencesAccessory: [null, []],*/
      /* safetyCertificateAccessory: [null, []],*/
     /* environmentReportAccessory: [null, []],*/
     /* dischargePermitAccessory: [null, []],*/
    });
  }
  async getIdCardInfo() {
    const param = this.loginInfo.id;
    const dataInfo = await this.dataService.getIdCardInfoDetail(param);
    const beginTime = new MapPipe().transform(dataInfo.businessLicencesBeginTime, 'date:yyyy-MM-dd');
    const endTime = new MapPipe().transform(dataInfo.businessLicencesEndTime, 'date:yyyy-MM-dd');
    const beginTime1 = new MapPipe().transform(dataInfo.safetyCertificateBeginTime, 'date:yyyy-MM-dd');
    const endTime1 = new MapPipe().transform(dataInfo.safetyCertificateEndTime, 'date:yyyy-MM-dd');
    const beginTime2 = new MapPipe().transform(dataInfo.dischargePermitBeginTime, 'date:yyyy-MM-dd');
    const endTime2 = new MapPipe().transform(dataInfo.dischargePermitEndTime, 'date:yyyy-MM-dd');
    dataInfo.safetyReportRecordTime =  new MapPipe().transform(dataInfo.safetyReportRecordTime, 'date:yyyy-MM-dd');
    dataInfo.environmentRecordTime = new MapPipe().transform(dataInfo.environmentRecordTime, 'date:yyyy-MM-dd');
    dataInfo.effectiveRange = [beginTime,endTime];
    dataInfo.effectiveRange1= [beginTime1,endTime1];
    dataInfo.effectiveRange2= [beginTime2,endTime2];
    this.validateForm.patchValue(dataInfo);
    this.cdr.markForCheck();
  }
  // 提交表单
  async submitForm() {
   /* Object.keys(this.validateForm.controls).forEach(key => {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    });
    if (this.validateForm.invalid) {
      return;
    } else {
      const params = this.validateForm.getRawValue();
      params.entprId = this.loginInfo.entprId;
      params.updateBy =this.loginInfo.realName;
      let submitHandel = null;*/
      //submitHandel = this.dataService.editEnterpriseInfoDetail(params);
     // await submitHandel;
     // this.msg.success(`提交成功`);
    //}

  }
  ngOnInit() {
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.initForm();
    this.getIdCardInfo();
  }
}
