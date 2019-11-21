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
  tankFormOptions: OptionsInterface[];
  tankStructureOptions: OptionsInterface[];
  tankMateOptions: OptionsInterface[];
  tankTypeOptions: OptionsInterface[];
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
      tankNo: [null, [Validators.required]],
      tankName: [null, [Validators.required]],
      tankType: [null, [Validators.required]],
      tankForm: [null, [Validators.required]],
      tankStructure: [null, [Validators.required]],
      tankMate: [null, [Validators.required]],
      tankCapacity: [null, [Validators.required]],
      productionDate: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      locFactory: [null, [Validators.required]],
    });
  }




  initTypeOptions() {
    this.tankTypeOptions = [...MapPipe.transformMapToArray(MapSet.tankType)];
    this.tankFormOptions = [...MapPipe.transformMapToArray(MapSet.tankForm)];
    this.tankStructureOptions = [...MapPipe.transformMapToArray(MapSet.tankStructure)];
    this.tankMateOptions = [...MapPipe.transformMapToArray(MapSet.tankMate)];
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
    this.initForm();
    this.initTypeOptions();
    if (this.id) {
      this.getDetail();
    }
  }
}
