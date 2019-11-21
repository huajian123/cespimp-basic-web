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
import { MajorHazardListInfoService } from '@core/biz-services/major-hazard-management/major-hazard-list.service';
import { EVENT_KEY } from '@env/staticVariable';
import { MapPipe, MapSet } from '@shared/directives/pipe/map.pipe';
interface OptionsInterface {
  value: string;
  label: string;
}
@Component({
  selector: 'app-major-hazard-management-major-hazard-edit-add',
  templateUrl: './major-hazard-edit-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MajorHazardManagementMajorHazardEditAddComponent implements OnInit {
  validateForm: FormGroup;
  form: FormGroup;
  @Input() id: number;
  @Input() currentPageNum: number;
  @Output() returnBack: EventEmitter<any>;
  unitTypeOptions: OptionsInterface[];
  HazardLevelOptions: OptionsInterface[];
  HazardNatureOptions: OptionsInterface[];
  loginInfo: LoginInfoModel;
  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              private dataService: MajorHazardListInfoService) {
    this.returnBack = new EventEmitter<any>();
    this.unitTypeOptions = [];
    this.HazardLevelOptions = [];
    this.HazardNatureOptions = [];
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
      majorHazardNo: [null, [Validators.required]],
      majorHazardName: [null, [Validators.required]],
      unitType: [null, [Validators.required]],
      majorHazardLevel: [null, [Validators.required]],
      majorHazardNature: [null, []],
      manager: [null, []],
      useDate: [null, []],
      rvalue: [null, []],
      managerMobile: [null, []],
      description: [null, []],
    });
  }
  async getDetail() {
    const dataInfo = await this.dataService.getMajorHazardInfoDetail(this.id);
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
    params.updateBy = this.loginInfo.userName;
    params.createBy = this.loginInfo.userName;
    let submitHandel = null;

    if (!this.id) {
      submitHandel = this.dataService.addMajorHazard(params);
    } else {
      params.id = this.id;
      submitHandel = this.dataService.editMajorHazard(params);
    }

    await submitHandel;
    this.returnBack.emit({ refesh: true, pageNo: this.currentPageNum });
  }
  ngOnInit() {
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.unitTypeOptions = [...MapPipe.transformMapToArray(MapSet.unitType)];
    this.HazardLevelOptions = [...MapPipe.transformMapToArray(MapSet.majorHazardLevel)];
    this.HazardNatureOptions = [...MapPipe.transformMapToArray(MapSet.majorHazardNature)];
    this.initForm();
    if (this.id) {
      this.getDetail();
    }
  }



}
