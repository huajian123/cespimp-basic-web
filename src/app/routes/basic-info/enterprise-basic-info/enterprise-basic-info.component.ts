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
import { TankListInfoService } from '@core/biz-services/storage-tank-management/tank-list.service';
import { MapPipe, MapSet } from '@shared/directives/pipe/map.pipe';
import { EVENT_KEY } from '@env/staticVariable';

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
  @Input() id: number;
  @Input() currentPageNum: number;
  @Output() returnBack: EventEmitter<any>;

  constructor(private fb: FormBuilder, private positionPickerService: PositionPickerService, private dataService: TankListInfoService,
              private cdr: ChangeDetectorRef) {
    this.returnBack = new EventEmitter<any>();
  }

  initForm() {
    this.validateForm = this.fb.group({
      entprName: [null, [Validators.required]],
      entprSimpleName: [null, [Validators.required]],
      region: [null, [Validators.required]],
      detailAddr: [null, [Validators.required]],
      entprScope: [null, [Validators.required]],
      tankMate: [null, [Validators.required]],
      tankCapacity: [null, [Validators.required]],
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
      majorHazardFlag: [null, [Validators.required]],
      majorHazardLevel: [null, [Validators.required]],
    });
  }


  showMap() {
    this.positionPickerService.show({ isRemoteImage: true }).then(res => {
      this.validateForm.get('longitude').setValue(res.longitude);
      this.validateForm.get('latitude').setValue(res.latitude);
    }).catch(e => null);
  }

  // 提交表单
  async _submitForm() {
    Object.keys(this.validateForm.controls).forEach(key => {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    });

    if (this.validateForm.invalid) return;

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
    /*  this.returnBack.emit({ refesh: true, pageNo: this.currentPageNum });*/
  }

  async getDetail() {
    const dataInfo = await this.dataService.getTankInfoDetail(this.id);
    this.validateForm.patchValue(dataInfo);
    this.cdr.markForCheck();
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
    if (this.id) {
      this.getDetail();
    }
  }
}
