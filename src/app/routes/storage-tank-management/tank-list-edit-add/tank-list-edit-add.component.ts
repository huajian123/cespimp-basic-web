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
import { EVENT_KEY } from '@env/staticVariable';
import { TankListInfoService } from '@core/biz-services/storage-tank-management/tank-list.service';
import { MapPipe, MapSet } from '@shared/directives/pipe/map.pipe';


interface OptionsInterface {
  value: string;
  label: string;
}

@Component({
  selector: 'app-storage-tank-management-tank-list-edit-add',
  templateUrl: './tank-list-edit-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorageTankManagementTankListEditAddComponent implements OnInit {
  validateForm: FormGroup;
  form: FormGroup;
  @Input() id: number;
  @Input() currentPageNum: number;
  @Output() returnBack: EventEmitter<any>;
  loginInfo: LoginInfoModel;
  tankFormOptions: OptionsInterface[];
  tankStructureOptions: OptionsInterface[];
  tankMateOptions: OptionsInterface[];
  tankTypeOptions: OptionsInterface[];


  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              private dataService: TankListInfoService, private positionPickerService: PositionPickerService) {
    this.returnBack = new EventEmitter<any>();
    this.tankFormOptions = [];
    this.tankStructureOptions = [];
    this.tankMateOptions = [];
    this.tankTypeOptions = [];

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
      tankNo: [null, [Validators.required]],
      tankName: [null, [Validators.required]],
      tankType: [null, [Validators.required]],
      tankForm: [null, []],
      tankStructure: [null, []],
      tankMate: [null, []],
      tamkCapacity: [null, []],
      productionDate: [null, []],
      longitude: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      locFactory: [null, []],
    });
  }

  async getDetail() {
    const dataInfo = await this.dataService.getTankInfoDetail(this.id);
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
    params.createBy = this.loginInfo.createBy;
    params.updateBy = this.loginInfo.updateBy;
    let submitHandel = null;

    if (!this.id) {
      submitHandel = this.dataService.addTank(params);
    } else {
      params.id = this.id;
      submitHandel = this.dataService.editTank(params);
    }

    await submitHandel;
    this.returnBack.emit({ refesh: true, pageNo: this.currentPageNum });
  }

  ngOnInit() {
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.tankTypeOptions = [...MapPipe.transformMapToArray(MapSet.tankType)];
    this.tankFormOptions = [...MapPipe.transformMapToArray(MapSet.tankForm)];
    this.tankStructureOptions = [...MapPipe.transformMapToArray(MapSet.tankStructure)];
    this.tankMateOptions = [...MapPipe.transformMapToArray(MapSet.tankMate)];
    this.initForm();
    if (this.id) {
      this.getDetail();
    }
  }

}
