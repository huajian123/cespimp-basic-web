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
import { WarehouseListInfoService } from '@core/biz-services/warehouse-management/warehouse-list.service';
import { MapPipe, MapSet } from '@shared/directives/pipe/map.pipe';
import { LoginInfoModel } from '@core/vo/comm/BusinessEnum';
import { PositionPickerService } from '../../../widget/position-picker/position-picker.service';
import { EVENT_KEY } from '@env/staticVariable';

interface OptionsInterface {
  value: string;
  label: string;
}

@Component({
  selector: 'app-warehouse-management-warehouse-list-edit-add',
  templateUrl: './warehouse-list-edit-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarehouseManagementWarehouseListEditAddComponent implements OnInit {
  validateForm: FormGroup;
  form: FormGroup;
  @Input() id: number;
  @Input() currentPageNum: number;
  @Output() returnBack: EventEmitter<any>;
  fireLevelOptions: OptionsInterface[];
  roomFormOptions: OptionsInterface[];
  loginInfo: LoginInfoModel;

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              private dataService: WarehouseListInfoService, private positionPickerService: PositionPickerService) {
    this.returnBack = new EventEmitter<any>();
    this.fireLevelOptions = [];
    this.roomFormOptions = [];
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
      roomNo: [null, [Validators.required]],
      roomName: [null, [Validators.required]],
      roomArea: [null, []],
      roomForm: [null, []],
      fireLevel: [null, []],
      longitude: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      locFactory: [null, []],
    });
  }

  async getDetail() {
    const dataInfo = await this.dataService.getWarehouseInfoDetail(this.id);
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
    params.createBy = this.loginInfo.userName;
    params.updateBy = this.loginInfo.userName;
    let submitHandel = null;

    if (!this.id) {
      submitHandel = this.dataService.addWarehouse(params);
    } else {
      params.id = this.id;
      submitHandel = this.dataService.editWarehouse(params);
    }

    await submitHandel;
    this.returnBack.emit({ refesh: true, pageNo: this.currentPageNum });
  }

  showMap() {
    this.positionPickerService.show({ isRemoteImage: true }).then(res => {
      this.validateForm.get('longitude').setValue(res.longitude);
      this.validateForm.get('latitude').setValue(res.latitude);
    }).catch(e => null);
  }

  ngOnInit() {
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.fireLevelOptions = [...MapPipe.transformMapToArray(MapSet.fireLevel)];
    this.roomFormOptions = [...MapPipe.transformMapToArray(MapSet.roomForm)];
    this.initForm();
    if (this.id) {
      this.getDetail();
    }

  }
}
