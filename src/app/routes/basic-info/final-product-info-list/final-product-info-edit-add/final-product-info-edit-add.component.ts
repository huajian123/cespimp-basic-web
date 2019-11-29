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
import {
  EnterpriseOriginalProductService,
  EnterpriseOriginalProductServiceNs,
} from '@core/biz-services/basic-info/enterprise-original-products.service';
import { EVENT_KEY } from '@env/staticVariable';
import ProductEnum = EnterpriseOriginalProductServiceNs.ProductEnum;


@Component({
  selector: 'app-basic-info-final-product-info-edit-add',
  templateUrl: './final-product-info-edit-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfoFinalProductInfoEditAddComponent implements OnInit {
  validateForm: FormGroup;
  form: FormGroup;
  @Input() id: number;
  @Input() currentPageNum: number;
  @Output() returnBack: EventEmitter<any>;
  loginInfo: LoginInfoModel;
  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              private dataService: EnterpriseOriginalProductService) {
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
      productType: [null, []],
      productName: [null, [Validators.required]],
      alias: [null, [Validators.required]],
      casNo: [null, [Validators.required]],
      annualConsumption: [null, []],
      maximumReserves: [null, []],
    });
  }
  async getDetail() {
    const dataInfo = await this.dataService.getEnterProductInfoDetail(this.id);
    this.validateForm.patchValue(dataInfo);
    this.cdr.markForCheck();
  }

  returnToList() {
    this.returnBack.emit({ refesh: false, pageNo: this.currentPageNum });
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
      params.productType = ProductEnum.FinalPro;//所属最终产品一类
      params.createBy = this.loginInfo.userName;
      submitHandel = this.dataService.addProductionMaterialsInfo(params);
    } else {
      params.id = this.id;
      params.updateBy = this.loginInfo.userName;
      submitHandel = this.dataService.editEnterProductInfoDetail(params);
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
