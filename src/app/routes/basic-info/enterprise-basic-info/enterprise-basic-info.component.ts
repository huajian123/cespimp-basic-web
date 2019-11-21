import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginInfoModel } from '@core/vo/comm/BusinessEnum';
import { PositionPickerService } from '../../../widget/position-picker/position-picker.service';
import { MapPipe, MapSet } from '@shared/directives/pipe/map.pipe';
import { EVENT_KEY } from '@env/staticVariable';
import { MessageType, ShowMessageService } from '../../../widget/show-message/show-message';
import {
  EnterpriseBasicInfoService,
  EnterpriseBasicInfoServiceNs,
} from '@core/biz-services/basic-info/enterprise-basic-info.service';
import EntprSearch = EnterpriseBasicInfoServiceNs.EntprSearch;
import { NzMessageService } from 'ng-zorro-antd';
import EnterpriseName = EnterpriseBasicInfoServiceNs.EnterpriseName;

interface OptionsInterface {
  value: string;
  label: string;
}

@Component({
  selector: 'app-basic-info-enterprise-basic-info',
  templateUrl: './enterprise-basic-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfoEnterpriseBasicInfoComponent implements OnInit {
  operatingOptions: OptionsInterface[];
  ecoTypeOptions: OptionsInterface[];
  entprScaleOptions: OptionsInterface[];
  standLevelOptions: OptionsInterface[];
  SupervisionLevelOptions: OptionsInterface[];
  regionOptions: OptionsInterface[];
  validateForm: FormGroup;
  loginInfo: LoginInfoModel;
  @Input() entprId: number;
  @Input() applicationName: string;
  @Input() id: number;
  @Input() currentPageNum: number;
  @Output() returnBack: EventEmitter<any>;

  constructor(private fb: FormBuilder, private positionPickerService: PositionPickerService, private dataService: EnterpriseBasicInfoService,
              private cdr: ChangeDetectorRef, private messageService: ShowMessageService, private msg: NzMessageService) {
    this.operatingOptions = [];
    this.ecoTypeOptions = [];
    this.entprScaleOptions = [];
    this.standLevelOptions = [];
    this.SupervisionLevelOptions = [];
    this.regionOptions = [];
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
    this.returnBack = new EventEmitter<any>();
  }

  initForm() {
    this.validateForm = this.fb.group({
      entprName: [null, [Validators.required]],
      entprSimpleName: [null, [Validators.required]],
      region: [null, [Validators.required]],
      detailAddr: [null, [Validators.required]],
      legalPerson: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      legalMobile: [null, [Validators.required]],
      boss: [null, [Validators.required]],
      bossMobile: [null, [Validators.required]],
      safetyManager: [null, [Validators.required]],
      safetyMobile: [null, [Validators.required]],
      businessScope: [null, [Validators.required]],
      operatingStatus: [null, [Validators.required]],
      ecoType: [null, [Validators.required]],
      entprScale: [null, [Validators.required]],
      regCapi: [null, [Validators.required]],
      floorArea: [null, [Validators.required]],
      employeeNum: [null, [Validators.required]],
      specialOperationNum: [null, [Validators.required]],
      standLevel: [null, [Validators.required]],
      safetySupervisionLevel: [null, [Validators.required]],
      localSafetyAdmin: [null, [Validators.required]],
    });
  }


  showMap() {
    this.positionPickerService.show({ isRemoteImage: true }).then(res => {
      this.validateForm.get('longitude').setValue(res.longitude);
      this.validateForm.get('latitude').setValue(res.latitude);
    }).catch(e => null);
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
      params.updateBy =this.loginInfo.realName;
      let submitHandel = null;
      submitHandel = this.dataService.editEnterpriseInfoDetail(params);
      await submitHandel;
      this.msg.success(`提交成功`);
      /*this.returnBack.emit({ refesh: true, pageNo: this.currentPageNum });*/
    }

  }

  async getDetail() {
    const param: EntprSearch = {
      entprId: this.loginInfo.entprId,
    };
    const dataInfo = await this.dataService.getEnterpriseInfoDetail(param);
    //console.log(dataInfo);
    this.validateForm.patchValue(dataInfo);
    this.cdr.markForCheck();
  }

  /*提交审核*/
  goSubmit() {
    const modalCtrl = this.messageService.showAlertMessage('', '确认已填写完成企业基本信息、证照信息、周边环境信息、生产原料信息、中间产品信息、最终产品信息，并提交到监管部门审核！', MessageType.Confirm);
    modalCtrl.afterClose.subscribe((type: string) => {
      if (type !== 'onOk') {
        return;
      }
      const param: EnterpriseName = {
        entprId: this.loginInfo.entprId,
        applicationName: this.loginInfo.realName,
      };
       this.dataService.getExamine(param);
    });
  }

  ngOnInit() {
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.operatingOptions = [...MapPipe.transformMapToArray(MapSet.operatingStatus)];
    this.ecoTypeOptions = [...MapPipe.transformMapToArray(MapSet.ecoType)];
    this.entprScaleOptions = [...MapPipe.transformMapToArray(MapSet.entprScale)];
    this.standLevelOptions = [...MapPipe.transformMapToArray(MapSet.standLevel)];
    this.SupervisionLevelOptions = [...MapPipe.transformMapToArray(MapSet.safetySupervisionLevel)];
    this.regionOptions = [...MapPipe.transformMapToArray(MapSet.region)];
    this.initForm();
    this.getDetail();
  }
}
