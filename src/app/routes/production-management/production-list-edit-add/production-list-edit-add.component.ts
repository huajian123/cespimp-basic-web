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
import { PositionPickerService } from '../../../widget/position-picker/position-picker.service';
import { LoginInfoModel } from '@core/vo/comm/BusinessEnum';
import { ProductionListInfoService } from '@core/biz-services/production-management/production-list.service';
import { EVENT_KEY } from '@env/staticVariable';

@Component({
  selector: 'app-production-management-production-list-edit-add',
  templateUrl: './production-list-edit-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductionManagementProductionListEditAddComponent implements OnInit {
  validateForm: FormGroup;
  form: FormGroup;
  @Input() id: number;
  @Input() currentPageNum: number;
  @Output() returnBack: EventEmitter<any>;
  loginInfo: LoginInfoModel;
  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              private dataService: ProductionListInfoService, private positionPickerService: PositionPickerService) {
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
      placeNo: [null, [Validators.required]],
      placeName: [null, [Validators.required]],
      placeArea: [null, []],
      productionDate: [null, []],
      longitude: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      locFactory: [null, []],
    });
  }

  async getDetail() {
    const dataInfo = await this.dataService.getProductionInfoDetail(this.id);
    this.validateForm.patchValue(dataInfo);
    this.cdr.markForCheck();
  }
  returnToList() {
    this.returnBack.emit();
  }

  showMap() {
    this.positionPickerService.show({ isRemoteImage: true }).then(res => {
      this.validateForm.get('longitude').setValue(res.longitude);
      this.validateForm.get('latitude').setValue(res.latitude);
    }).catch(e => null);
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
      submitHandel = this.dataService.addProduction(params);
    } else {
      params.id = this.id;
      submitHandel = this.dataService.editProduction(params);
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
