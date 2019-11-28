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
import { NzMessageService } from 'ng-zorro-antd';
import { EVENT_KEY } from '@env/staticVariable';
import { MapPipe, MapSet } from '@shared/directives/pipe/map.pipe';
import { EnterpriseSurroundingInfoService } from '@core/biz-services/basic-info/enterprise-surrounding-info.service';

interface OptionsInterface {
  value: string;
  label: string;
}


@Component({
  selector: 'app-basic-info-enterprise-surrounding-info-edit-add',
  templateUrl: './enterprise-surrounding-info-edit-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfoEnterpriseSurroundingInfoEditAddComponent implements OnInit {
  validateForm: FormGroup;
  form: FormGroup;
  @Input() id: number;
  @Input() currentPageNum: number;
  @Output() returnBack: EventEmitter<any>;
  envrTypeOptions: OptionsInterface[];
  envrDirectionOptions: OptionsInterface[];
  buildStructOptions: OptionsInterface[];
  loginInfo: LoginInfoModel;

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              private dataService: EnterpriseSurroundingInfoService) {
    this.returnBack = new EventEmitter<any>();
    this.envrTypeOptions = [];
    this.envrDirectionOptions = [];
    this.buildStructOptions = [];
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
      envrType: [null, [Validators.required]],
      envrName: [null, [Validators.required]],
      envrDirection: [null, [Validators.required]],
      miniDistance: [null, [Validators.required]],
      buildStruct: [null, []],
      adjacentBuildHeight: [null, []],
      personNum: [null, []],
      envrContacts: [null, []],
      contactMoble: [null, []],
    });
  }

  async getDetail() {
    const dataInfo = await this.dataService.getEnterpriseInfoDetail(this.id);
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
      submitHandel = this.dataService.addEnterpriseSurrounding(params);
    } else {
      params.id = this.id;
      submitHandel = this.dataService.editEnterpriseSurrounding(params);
    }

    await submitHandel;
    this.returnBack.emit({ refesh: true, pageNo: this.currentPageNum });
  }

  ngOnInit() {
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.envrTypeOptions = [...MapPipe.transformMapToArray(MapSet.envrType)];
    this.envrDirectionOptions = [...MapPipe.transformMapToArray(MapSet.envrDirection)];
    this.buildStructOptions = [...MapPipe.transformMapToArray(MapSet.buildStruct)];
    this.initForm();
    if (this.id) {
      this.getDetail();
    }
  }

}
